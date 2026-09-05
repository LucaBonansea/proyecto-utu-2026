<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function register(Request $request, AuthService $authService)
    {
        $datos = $request->validate(
            [
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


                'password' => [
                    'required',
                    'string',
                    'min:6',
                    'confirmed'
                ],
                'edificio' => [
                    'required',
                    'integer',
                    'exists:edificios,id'
                ],
            ],
            [
                'cedula.required' => 'Debes ingresar la cédula.',
                'cedula.unique' => 'Ya existe un usuario con esa cédula.',

                'nombre.required' => 'Debes ingresar el nombre.',
                'edificio.required' => 'Debes seleccionar un edificio.',
                'edificio.exists' => 'El edificio seleccionado no existe.',

                'telefono.required' => 'Debes ingresar el teléfono.',

                'password.required' => 'Debes ingresar una contraseña.',
                'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
                'password.confirmed' => 'Las contraseñas no coinciden.'
            ]
        );

        $usuario = $authService->registrar($datos);

        return response()->json([
            'mensaje' => 'Usuario registrado correctamente',
            'usuario' => $usuario
        ], 201);
    }

    public function login(Request $request, AuthService $authService)
    {
        $datos = $request->validate(
            [
                'cedula' => [
                    'required',
                    'string'
                ],

                'password' => [
                    'required',
                    'string'
                ]
            ],
            [
                'cedula.required' => 'Debes ingresar la cédula.',
                'password.required' => 'Debes ingresar la contraseña.'
            ]
        );

        $usuario = $authService->login($datos);

        if (!$usuario) {
            return response()->json([
                'mensaje' => 'Cédula o contraseña incorrectas.'
            ], 401);
        }

        return response()->json([
            'mensaje' => 'Inicio de sesión correcto',
            'usuario' => $usuario
        ], 200);
    }
}