<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;

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
                'politicas_aceptadas' => [
                    'required',
                    'accepted'
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
                'password.confirmed' => 'Las contraseñas no coinciden.',
                'politicas_aceptadas.accepted' => 'Debes aceptar las políticas de uso.'
            ]
        );

        $usuario = $authService->registrar($datos);

        return response()->json([
            'mensaje' => 'Usuario registrado correctamente',
            'usuario' => $usuario
        ], 201);
    }

    public function login(Request $request)
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
                ],
            ],
            [
                'cedula.required' => 'Debes ingresar la cédula.',
                'password.required' => 'Debes ingresar la contraseña.'
            ]
        );

        $credenciales = [
            'cedula' => $datos['cedula'],
            'password' => $datos['password'],
            'activo' => true
        ];

        if (!Auth::attempt($credenciales)) {
            return response()->json([
                'mensaje' => 'Cédula o contraseña incorrectas.'
            ], 401);
        }

        $request->session()->regenerate();

        $usuario = Auth::user();

        return response()->json([
            'mensaje' => 'Credenciales verificadas correctamente.',
            'requiere_aceptar_politicas' => !$usuario->politicas_aceptadas,
            'usuario' => $usuario
        ], 200);
    }

    public function aceptarPoliticas(Request $request, AuthService $authService)
    {
        $request->validate(
            [
                'acepta' => ['required', 'accepted'],
            ],
            [
                'acepta.accepted' => 'Debes confirmar que leíste y aceptás las políticas.'
            ]
        );

        $usuario = $authService->aceptarPoliticas($request->user());

        return response()->json([
            'mensaje' => 'Políticas aceptadas correctamente.',
            'usuario' => $usuario
        ], 200);
    }

    public function me(Request $request)
    {
        return response()->json([
            'usuario' => $request->user()
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'mensaje' => 'Sesión cerrada correctamente.'
        ], 200);
    }
}
