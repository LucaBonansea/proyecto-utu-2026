<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioService
{
    public function obtenerTodos()
    {
        return Usuario::with([
            'edificios',
            'proveedor'
        ])->get();
    }

    public function crear(array $datos)
    {
        $usuario = Usuario::create([
            'cedula' => $datos['cedula'],
            'nombre' => $datos['nombre'],
            'telefono' => $datos['telefono'] ?? null,
            'email' => $datos['email'] ?? null,
            'password' => Hash::make($datos['password']),
            'rol' => $datos['rol'],
            'activo' => true,
        ]);

        // Usuario perteneciente a edificios
        if (
            $datos['rol'] === 'usuario_edificio' &&
            !empty($datos['edificios'])
        ) {
            $usuario->edificios()->attach(
                $datos['edificios']
            );
        }

        // Usuario perteneciente a proveedor
        if (
            $datos['rol'] === 'usuario_proveedor' &&
            !empty($datos['proveedor'])
        ) {
            $usuario->proveedor_id = $datos['proveedor'];
            $usuario->save();
        }

        return $usuario->load([
            'edificios',
            'proveedor'
        ]);
    }

    public function actualizarPassword(
        string $cedula,
        string $password
    ) {
        $usuario = Usuario::findOrFail($cedula);

        $usuario->update([
            'password' => Hash::make($password),
        ]);

        return $usuario;
    }

    public function actualizarRol(
        string $cedula,
        array $datos
    ) {
        $usuario = Usuario::findOrFail($cedula);

        $usuario->update([
            'rol' => $datos['rol'],
        ]);

        // Edificios
        $usuario->edificios()->sync(
            $datos['rol'] === 'usuario_edificio'
                ? $datos['edificios']
                : []
        );

        // Proveedor
        $usuario->proveedor_id =
            $datos['rol'] === 'usuario_proveedor'
                ? $datos['proveedor']
                : null;

        $usuario->save();

        return $usuario->load([
            'edificios',
            'proveedor'
        ]);
    }
}