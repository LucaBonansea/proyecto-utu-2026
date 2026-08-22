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
        'nombre' => 'required|string|max:100',

        'telefono' => [
            'required',
            'string',
            'regex:/^09\d{7}$/',
            'unique:usuarios,telefono'
        ],

        'pin' => [
            'required',
            'digits:4',
            'confirmed'
        ]
    ],
    [
        'nombre.required' => 'Debes ingresar tu nombre.',

        'telefono.required' => 'Debes ingresar tu número telefónico.',
        'telefono.regex' => 'El número telefónico no tiene un formato válido.',
        'telefono.unique' => 'Este número telefónico ya está registrado.',

        'pin.required' => 'Debes ingresar un PIN.',
        'pin.digits' => 'El PIN debe contener exactamente 4 números.',
        'pin.confirmed' => 'Los PIN ingresados no coinciden.'
    ]
);

        $usuario = $authService->registrar($datos);

        return response()->json([
            'mensaje' => 'Usuario registrado correctamente',
            'usuario' => $usuario
        ], 201);
    }
}