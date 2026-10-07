<?php

namespace App\Services;

use App\Models\Reclamo;
use App\Models\Evidencia;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class ReclamoService
{
    private const ESTADOS_RESUELTOS = [
        'completado',
        'finalizacion_confirmada',
    ];

    private const ESTADOS_CERRADOS = [
        'finalizacion_confirmada',
    ];

    public function existeDuplicadoActivo(array $datos, string $cedula): bool
    {
        $descripcion = Str::lower(
            Str::squish($datos['description'])
        );

        return Reclamo::query()
            ->where('usuario_cedula', $cedula)
            ->where('edificio_id', $datos['edificio_id'])
            ->where('clasificacion_id', $datos['clasificacion_id'])
            ->whereNotIn('estado', self::ESTADOS_CERRADOS)
            ->pluck('description')
            ->contains(
                fn (string $existente): bool => Str::lower(
                    Str::squish($existente)
                ) === $descripcion
            );
    }

    public function crear(array $datos, string $cedula)
    {
        $reclamo = Reclamo::create([
            'usuario_cedula' => $cedula,
            'edificio_id' => $datos['edificio_id'],
            'description' => Str::squish($datos['description']),
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
            $consulta->whereIn('estado', self::ESTADOS_RESUELTOS);
        }

        if ($filtro === 'proceso') {
            $consulta->whereNotIn('estado', self::ESTADOS_RESUELTOS);
        }

        return $consulta
            ->latest()
            ->paginate($porPagina);
    }

    public function obtenerEstadisticasPorUsuario(string $cedula): array
    {
        $consulta = Reclamo::where('usuario_cedula', $cedula);
        $total = (clone $consulta)->count();
        $resueltos = (clone $consulta)
            ->whereIn('estado', self::ESTADOS_RESUELTOS)
            ->count();

        return [
            'total' => $total,
            'resueltos' => $resueltos,
            'en_proceso' => $total - $resueltos,
        ];
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
