<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function registrar(array $datos){
    $usuario = Usuario::create([
        'cedula' => $datos['cedula'],
        'nombre' => $datos['nombre'],
        'password' => Hash::make($datos['password']),
        'rol' => 'usuario_edificio',
        'activo' => true
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
}