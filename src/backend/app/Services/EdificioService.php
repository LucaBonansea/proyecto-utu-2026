<?php

namespace App\Services;

use App\Models\Edificio;

class EdificioService
{
    public function obtenerTodos()
    {
        return Edificio::all();
    }

    public function crear(array $datos)
    {
        return Edificio::create([
            'nombre' => $datos['nombre'],
            'direccion' => $datos['direccion'],
        ]);
    }
}