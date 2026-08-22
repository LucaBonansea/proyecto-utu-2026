<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function registrar(array $datos)
    {
        return Usuario::create([
            'nombre' => $datos['nombre'],
            'telefono' => $datos['telefono'],
            'pin' => Hash::make($datos['pin']),
            'rol' => 'ciudadano',
            'identidad_validada' => false
        ]);
    }
}