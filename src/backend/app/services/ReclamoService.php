<?php

namespace App\Services;

use App\Models\Reclamo;
use App\Models\Evidencia;

class ReclamoService
{
    public function crear(array $datos, string $cedula)
    {
        $reclamo = Reclamo::create([
            'usuario_cedula' => $cedula,
            'edificio_id' => $datos['edificio_id'],
            'description' => $datos['description'],
            'clasificacion_id' => $datos['clasificacion_id'],
            'estado' => 'pendiente',
        ]);

        $path = $datos['photo']->store(
            'reclamos',
            'public'
        );

        Evidencia::create([
            'reclamo_id' => $reclamo->id,
            'ruta_archivo' => $path,
            'fecha_carga' => now(),
        ]);

        return $reclamo;
    }
}