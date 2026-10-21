<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

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
