<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function registrar(array $datos)
    {
        $usuario = Usuario::create([
            'cedula' => $datos['cedula'],
            'nombre' => $datos['nombre'],
            'password' => Hash::make($datos['password']),
            'rol' => 'usuario_edificio',
            'activo' => true,
            'politicas_aceptadas' => true,
            'politicas_aceptadas_at' => now(),
        ]);

        $usuario->edificios()->attach($datos['edificio']);

        return $usuario;
    }

    public function login(array $datos)
    {
        $usuario = Usuario::where('cedula', $datos['cedula'])->first();

        if (!$usuario) {
            return null;
        }

        if (!$usuario->activo) {
            return null;
        }

        if (!Hash::check($datos['password'], $usuario->password)) {
            return null;
        }

        return $usuario;
    }

    public function aceptarPoliticas(Usuario $usuario): Usuario
    {
        if (!$usuario->politicas_aceptadas) {
            $usuario->update([
                'politicas_aceptadas' => true,
                'politicas_aceptadas_at' => now(),
            ]);
        }

        return $usuario->refresh();
    }
}
