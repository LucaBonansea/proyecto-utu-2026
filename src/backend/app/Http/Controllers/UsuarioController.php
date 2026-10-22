<?php

namespace App\Http\Controllers;

use App\Services\UsuarioService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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

        $usuario = $usuarioService->crear($datos);

        return response()->json([
            'message' => 'Usuario creado correctamente',
            'usuario' => $usuario,
        ], 201);
    }

    public function updatePassword(
        Request $request,
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $datos = $request->validate([
            'password' => [
                'required',
                'string',
                'min:8',
                'max:255',
            ],
        ]);

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
        $datos = $request->validate([
            ...$this->reglasAsignacion(),
        ]);

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
        string $cedula,
        UsuarioService $usuarioService
    ) {
        $usuario = $usuarioService->desactivar($cedula);

        return response()->json([
            'message' => 'Usuario desactivado correctamente',
            'usuario' => $usuario,
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
}
