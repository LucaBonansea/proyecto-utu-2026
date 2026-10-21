<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function porEdificio(Request $request, $edificioId)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return response()->json([
                'mensaje' => 'No autenticado.'
            ], 401);
        }

        if ($usuario->rol !== 'usuario_edificio') {
            return response()->json([
                'mensaje' => 'No autorizado.'
            ], 403);
        }

        $tieneAcceso = $usuario->edificios()
            ->where('edificios.id', $edificioId)
            ->exists();

        if (!$tieneAcceso) {
            return response()->json([
                'mensaje' => 'No tienes acceso a este edificio.'
            ], 403);
        }

        $areas = Area::where('edificio_id', $edificioId)
            ->orderBy('nombre')
            ->get();

        return response()->json($areas);
    }
}