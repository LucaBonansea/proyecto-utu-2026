<?php

namespace App\Http\Controllers;

use App\Services\UsuarioService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index(UsuarioService $usuarioService)
    {
        $usuarios = $usuarioService->obtenerTodos();

        return response()->json($usuarios);
    }

    public function store(
        Request $request,
        UsuarioService $usuarioService
    ) {
        $datos = $request->validate([
            'cedula' => [
                'required',
                'string',
                'max:20',
                'unique:usuarios,cedula'
            ],

            'nombre' => [
                'required',
                'string',
                'max:100'
            ],

            'telefono' => [
                'nullable',
                'string',
                'max:30'
            ],

            'email' => [
                'nullable',
                'email',
                'max:150'
            ],

            'password' => [
                'required',
                'string',
                'min:6'
            ],

            'rol' => [
                'required',
                Rule::in([
                    'usuario_edificio',
                    'administrador',
                    'administrativo',
                    'usuario_proveedor'
                ])
            ],

            'edificios' => [
                'nullable',
                'required_if:rol,usuario_edificio',
                'array',
            ],

            'edificios.*' => [
                'exists:edificios,id',
            ],

            'proveedor' => [
                'nullable',
                'required_if:rol,usuario_proveedor',
                'exists:proveedores,id'
            ],
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
                'min:6'
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
            'rol' => [
                'required',
                Rule::in([
                    'usuario_edificio',
                    'administrador',
                    'administrativo',
                    'usuario_proveedor'
                ])
            ],

            'edificios' => [
                'nullable',
                'required_if:rol,usuario_edificio',
                'array',
            ],

            'edificios.*' => [
                'exists:edificios,id',
            ],

            'proveedor' => [
                'nullable',
                'required_if:rol,usuario_proveedor',
                'exists:proveedores,id'
            ],
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
}