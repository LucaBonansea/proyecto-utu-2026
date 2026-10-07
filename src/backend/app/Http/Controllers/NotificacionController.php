<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use App\Services\NotificacionService;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    public function __construct(
        private readonly NotificacionService $notificacionService
    ) {
    }

    public function index(Request $request)
    {
        $notificaciones = $this->notificacionService->obtenerPorUsuario(
            $request->user()->cedula
        );

        return response()->json([
            'notificaciones' => $notificaciones,
        ], 200);
    }

    public function marcarComoLeida(Request $request, int $id)
    {
        $notificacion = Notificacion::findOrFail($id);

        if ($notificacion->usuario_cedula !== $request->user()->cedula) {
            return response()->json([
                'message' => 'No autorizado',
            ], 403);
        }

        $notificacion->update([
            'leida' => true,
        ]);

        return response()->json([
            'message' => 'Notificación marcada como leída',
            'notificacion' => $notificacion,
        ], 200);
    }

    public function marcarTodasLeidas(Request $request)
    {
        $cantidad = $this->notificacionService->marcarTodasLeidas(
            $request->user()->cedula
        );

        return response()->json([
            'message' => 'Notificaciones marcadas como leídas',
            'actualizadas' => $cantidad,
        ], 200);
    }

}
