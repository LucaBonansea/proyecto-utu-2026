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

    public function login(array $datos){
        $telefono = $datos['telefono'];
        $pin = $datos['pin'];

        $usuario = Usuario::where('telefono', $telefono)->first();

        if($usuario){
            $pass = Hash::check($pin, $usuario->pin);

            if($pass){
                return $usuario;
            }
        }
    }
}