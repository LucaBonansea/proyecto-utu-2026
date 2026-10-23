<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
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
            'es_super_admin' => false,
            'activo' => true,
            'politicas_aceptadas' => false,
            'politicas_aceptadas_at' => null,
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

    public function actualizarDatos(
        Usuario $usuario,
        array $datos
    ): Usuario {
        return DB::transaction(function () use ($usuario, $datos) {
            $usuario->fill([
                'nombre' => $datos['nombre'],
                'telefono' => $datos['telefono'] ?? null,
                'email' => $datos['email'] ?? null,
                'activo' => $datos['activo'] ?? $usuario->activo,
            ]);

            $usuario->save();

            return $usuario->fresh()->load([
                'edificios',
                'proveedor'
            ]);
        });
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

        $this->sincronizarAsignaciones($usuario, $datos);

        return $usuario->load([
            'edificios',
            'proveedor'
        ]);
    }

    public function desactivar(string $cedula): Usuario
    {
        $usuario = Usuario::findOrFail($cedula);

        $usuario->update(['activo' => false]);

        return $usuario;
    }

    public function eliminar(
        Usuario $usuario,
        ?Usuario $nuevoSuperAdmin = null
    ): ?Usuario {
        return DB::transaction(function () use ($usuario, $nuevoSuperAdmin) {
            if ($usuario->es_super_admin && $nuevoSuperAdmin) {
                $nuevoSuperAdmin->update(['es_super_admin' => true]);
                $usuario->update(['es_super_admin' => false]);
            }

            $usuario->edificios()->detach();
            $usuario->delete();

            return $nuevoSuperAdmin?->fresh();
        });
    }

    private function sincronizarAsignaciones(
        Usuario $usuario,
        array $datos
    ): void {
        $usuario->edificios()->sync(
            $datos['rol'] === 'usuario_edificio'
                ? ($datos['edificios'] ?? [])
                : []
        );

        $usuario->proveedor_id =
            $datos['rol'] === 'usuario_proveedor'
                ? ($datos['proveedor'] ?? null)
                : null;

        $usuario->save();
    }
}
