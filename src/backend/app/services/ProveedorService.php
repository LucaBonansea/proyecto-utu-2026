<?php

namespace App\Services;

use App\Models\Proveedor;

class ProveedorService
{
    public function obtenerTodos()
    {
        return Proveedor::all();
    }

    public function crear(array $datos)
    {
        return Proveedor::create($datos);
    }

    public function cambiarEstado(string $id)
    {
        $proveedor = Proveedor::findOrFail($id);

        $proveedor->estado =
            $proveedor->estado === 'Activo'
                ? 'Inactivo'
                : 'Activo';

        $proveedor->save();

        return $proveedor;
    }
}
