<?php

namespace App\Services;

use App\Models\Clasificacion;
use Illuminate\Database\Eloquent\Collection;

class ClasificacionService
{
    public function obtenerTodas(): Collection
    {
        return Clasificacion::all();
    }

    public function crear(array $datos): Clasificacion
    {
        return Clasificacion::create($datos);
    }
}
