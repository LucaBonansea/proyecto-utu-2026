<?php

namespace App\Services;

use App\Models\Notificacion;
use Illuminate\Database\Eloquent\Collection;

class NotificacionService
{
    public function crear(
        string $usuarioCedula,
        string $titulo,
        string $mensaje,
        string $tipo,
        ?int $reclamoId = null
    ): Notificacion {
        return Notificacion::create([
            'usuario_cedula' => $usuarioCedula,
            'titulo' => $titulo,
            'mensaje' => $mensaje,
            'tipo' => $tipo,
            'reclamo_id' => $reclamoId,
            'leida' => false,
        ]);
    }

    public function obtenerPorUsuario(string $usuarioCedula): Collection
    {
        return Notificacion::where('usuario_cedula', $usuarioCedula)
            ->latest()
            ->get();
    }

    public function marcarLeida(int $id, string $usuarioCedula): bool
    {
        $notificacion = Notificacion::where('id', $id)
            ->where('usuario_cedula', $usuarioCedula)
            ->firstOrFail();

        return (bool) $notificacion->update([
            'leida' => true,
        ]);
    }

    public function marcarTodasLeidas(string $usuarioCedula): int
    {
        return Notificacion::where('usuario_cedula', $usuarioCedula)
            ->where('leida', false)
            ->update([
                'leida' => true,
            ]);
    }
}
