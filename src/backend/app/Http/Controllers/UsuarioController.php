<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Services\UsuarioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UsuarioController extends Controller
{
    private const ROLES = [
        'usuario_edificio',
        'administrador',
        'administrativo',
        'usuario_proveedor',
    ];

    public function index(UsuarioService $usuarioService)
    {
        $usuarios = $usuarioService->obtenerTodos();

        return response()->json($usuarios);
    }

    public function store(
        Request $request,
        UsuarioService $usuarioService
    ) {
        $this->normalizarTelefono($request);

        $datos = $request->validate([
            'cedula' => [
                'bail',
                'required',
                'string',
                'regex:/^\d{7,8}$/',
                Rule::unique('usuarios', 'cedula'),
            ],

            'nombre' => [
                'required',
                'string',
                'max:100'
            ],

            'telefono' => [
                'nullable',
                'required_if:rol,usuario_edificio,usuario_proveedor',
                'string',
                'regex:/^09\d{7}$/',
            ],

            'email' => [
                'nullable',
                'email',
                'max:255'
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'max:255',
            ],

            ...$this->reglasAsignacion(),
        ]);

        if (
            $datos['rol'] === 'administrador' &&
            !$request->user()->es_super_admin
        ) {
            return response()->json([
                'message' => 'Solo el administrador superior puede crear administradores.',
            ], 403);
        }

        $usuario = $usuarioService->crear($datos);

        return response()->json([
            'message' => 'Usuario creado correctamente',
            'usuario' => $usuario,
        ], 201);
    }

    public function update(
        Request $request,
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $usuario = Usuario::findOrFail($cedula);
        $this->normalizarTelefono($request);

        $datos = $request->validate([
            'nombre' => ['required', 'string', 'max:100'],
            'telefono' => [
                'nullable',
                Rule::requiredIf(in_array($usuario->rol, ['usuario_edificio', 'usuario_proveedor'], true)),
                'string',
                'regex:/^09\d{7}$/',
            ],
            'email' => ['nullable', 'email', 'max:255'],
            'activo' => ['sometimes', 'boolean'],
            'password_actual' => ['required', 'string'],
        ]);

        if (!$this->puedeEditarDatos($request->user(), $usuario)) {
            return response()->json([
                'message' => 'No tienes permiso para editar este administrador.',
            ], 403);
        }

        $this->validarPasswordActual($request->user(), $datos['password_actual']);

        if (
            $usuario->es_super_admin &&
            (($datos['activo'] ?? true) === false)
        ) {
            return response()->json([
                'message' => 'Primero debes transferir el permiso de administrador superior.',
            ], 422);
        }

        if (
            $request->user()->cedula === $usuario->cedula &&
            (($datos['activo'] ?? true) === false)
        ) {
            return response()->json([
                'message' => 'No puedes desactivar tu propia cuenta.',
            ], 422);
        }

        $usuario = $usuarioService->actualizarDatos($usuario, $datos);

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'usuario' => $usuario,
        ]);
    }

    public function updatePassword(
        Request $request,
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $usuario = Usuario::findOrFail($cedula);

        if (!$this->puedeEditarDatos($request->user(), $usuario)) {
            return response()->json([
                'message' => 'No tienes permiso para editar este administrador.',
            ], 403);
        }

        $datos = $request->validate([
            'password' => [
                'required',
                'string',
                'min:8',
                'max:255',
            ],
            'password_actual' => ['required', 'string'],
        ]);

        $this->validarPasswordActual($request->user(), $datos['password_actual']);

        $usuarioService->actualizarPassword(
            $cedula,
            $datos['password']
        );

        return response()->json([
            'message' => 'Contraseña actualizada correctamente',
        ]);
    }

    public function updateRol(
        Request $request,
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $usuario = Usuario::findOrFail($cedula);

        $datos = $request->validate([
            'password_actual' => ['required', 'string'],
            ...$this->reglasAsignacion(),
        ]);

        if (!$this->puedeCambiarRol(
            $request->user(),
            $usuario,
            $datos['rol']
        )) {
            return response()->json([
                'message' => 'Solo el administrador superior puede asignar o modificar administradores.',
            ], 403);
        }

        $this->validarPasswordActual($request->user(), $datos['password_actual']);

        $usuario = $usuarioService->actualizarRol(
            $cedula,
            $datos
        );

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'usuario' => $usuario,
        ]);
    }

    public function desactivar(
        Request $request,
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $usuarioObjetivo = Usuario::findOrFail($cedula);

        if (!$this->puedeEditarDatos($request->user(), $usuarioObjetivo)) {
            return response()->json([
                'message' => 'No tienes permiso para desactivar este administrador.',
            ], 403);
        }

        if ($usuarioObjetivo->es_super_admin) {
            return response()->json([
                'message' => 'El administrador superior debe transferir su permiso antes de eliminarse.',
            ], 422);
        }

        if ($request->user()->cedula === $usuarioObjetivo->cedula) {
            return response()->json([
                'message' => 'No puedes desactivar tu propia cuenta.',
            ], 422);
        }

        $usuario = $usuarioService->desactivar($cedula);

        return response()->json([
            'message' => 'Usuario desactivado correctamente',
            'usuario' => $usuario,
        ]);
    }

    public function destroy(
        Request $request,
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $administradorActual = $request->user();
        $usuario = Usuario::findOrFail($cedula);

        if (
            $usuario->rol === 'administrador' &&
            !$administradorActual->es_super_admin
        ) {
            return response()->json([
                'message' => 'Solo el administrador superior puede eliminar administradores.',
            ], 403);
        }

        if (
            $usuario->es_super_admin &&
            $administradorActual->cedula !== $usuario->cedula
        ) {
            return response()->json([
                'message' => 'El administrador superior solo puede eliminar su propia cuenta.',
            ], 403);
        }

        $reglas = [
            'password_actual' => ['required', 'string'],
        ];

        if ($usuario->es_super_admin) {
            $reglas['nuevo_super_admin_cedula'] = ['required', 'string'];
        }

        $datos = $request->validate($reglas);
        $this->validarPasswordActual($administradorActual, $datos['password_actual']);

        $nuevoSuperAdmin = null;

        if ($usuario->es_super_admin) {
            $nuevoSuperAdmin = Usuario::query()
                ->where('cedula', $datos['nuevo_super_admin_cedula'])
                ->where('cedula', '!=', $usuario->cedula)
                ->where('rol', 'administrador')
                ->where('activo', true)
                ->first();

            if (!$nuevoSuperAdmin) {
                return response()->json([
                    'message' => 'Selecciona un administrador activo para transferir el permiso superior.',
                ], 422);
            }
        }

        $sucesor = $usuarioService->eliminar($usuario, $nuevoSuperAdmin);
        $sesionCerrada = $administradorActual->cedula === $usuario->cedula;

        return response()->json([
            'message' => $sucesor
                ? "Usuario eliminado. {$sucesor->nombre} ahora es el administrador superior."
                : 'Usuario eliminado correctamente.',
            'sesion_cerrada' => $sesionCerrada,
            'nuevo_super_admin' => $sucesor,
        ]);
    }

    private function reglasAsignacion(): array
    {
        return [
            'rol' => ['required', Rule::in(self::ROLES)],
            'edificios' => [
                'nullable',
                'required_if:rol,usuario_edificio',
                'prohibited_unless:rol,usuario_edificio',
                'array',
                'min:1',
            ],
            'edificios.*' => ['integer', 'distinct', Rule::exists('edificios', 'id')],
            'proveedor' => [
                'nullable',
                'required_if:rol,usuario_proveedor',
                'prohibited_unless:rol,usuario_proveedor',
                'integer',
                Rule::exists('proveedores', 'id')->where('estado', 'Activo'),
            ],
        ];
    }

    private function normalizarTelefono(Request $request): void
    {
        $telefono = $request->input('telefono');

        if (is_string($telefono)) {
            $request->merge(['telefono' => preg_replace('/[\s().-]+/u', '', $telefono)]);
        }
    }

    private function validarPasswordActual(
        Usuario $administradorActual,
        string $passwordActual
    ): void {
        if (!Hash::check($passwordActual, $administradorActual->password)) {
            throw ValidationException::withMessages([
                'password_actual' => ['La contraseña del administrador no es correcta.'],
            ]);
        }
    }

    private function puedeEditarDatos(
        Usuario $administradorActual,
        Usuario $usuarioObjetivo
    ): bool {
        if ($usuarioObjetivo->es_super_admin) {
            return $administradorActual->cedula === $usuarioObjetivo->cedula;
        }

        if ($usuarioObjetivo->rol === 'administrador') {
            return $administradorActual->es_super_admin ||
                $administradorActual->cedula === $usuarioObjetivo->cedula;
        }

        return true;
    }

    private function puedeCambiarRol(
        Usuario $administradorActual,
        Usuario $usuarioObjetivo,
        string $nuevoRol
    ): bool {
        if ($usuarioObjetivo->es_super_admin) {
            return $administradorActual->cedula === $usuarioObjetivo->cedula &&
                $nuevoRol === 'administrador';
        }

        if (
            $usuarioObjetivo->rol === 'administrador' ||
            $nuevoRol === 'administrador'
        ) {
            return $administradorActual->es_super_admin || (
                $administradorActual->cedula === $usuarioObjetivo->cedula &&
                $nuevoRol === $usuarioObjetivo->rol
            );
        }

        return true;
    }
}
