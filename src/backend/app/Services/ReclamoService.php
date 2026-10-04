<?php

namespace App\Services;

use App\Models\Reclamo;
use App\Models\Evidencia;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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

    public function obtenerPorUsuario(
        string $cedula,
        string $filtro = 'todos',
        int $porPagina = 12
    ): LengthAwarePaginator {
        $consulta = Reclamo::with([
            'evidencia',
            'clasificacion',
            'edificio'
        ])
            ->where('usuario_cedula', $cedula);

        if ($filtro === 'resueltos') {
            $consulta->whereIn('estado', [
                'completado',
                'finalizacion_confirmada',
                'rechazada'
            ]);
        }

        if ($filtro === 'proceso') {
            $consulta->whereNotIn('estado', [
                'completado',
                'finalizacion_confirmada'
            ]);
        }

        return $consulta
            ->latest()
            ->paginate($porPagina);
    }

    public function obtenerTodos()
    {
        return Reclamo::with([
            'usuario',
            'edificio',
            'clasificacion',
            'evidencia',
            'proveedor'
        ])
        ->latest()
        ->get();
    }

    public function obtenerPendientes()
    {
        return Reclamo::where('estado', 'pendiente')
            ->with([
                'usuario',
                'edificio',
                'clasificacion',
                'evidencia',
                'proveedor'
            ])
            ->latest()
            ->get();
    }
}