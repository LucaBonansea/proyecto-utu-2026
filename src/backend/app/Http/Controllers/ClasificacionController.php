<?php

namespace App\Http\Controllers;

use App\Services\ClasificacionService;
use Illuminate\Http\Request;

class ClasificacionController extends Controller
{
    public function index(ClasificacionService $clasificacionService)
    {
        $clasificaciones = $clasificacionService->obtenerTodas();

        return response()->json($clasificaciones);
    }

    public function store(
        Request $request,
        ClasificacionService $clasificacionService
    )
    {
        if ($request->user()?->rol !== 'administrador') {
            return response()->json([
                'message' => 'No tienes permisos para crear clasificaciones.',
            ], 403);
        }

        $datos = $request->validate([
            'clasificacion' => ['required', 'string', 'max:255', 'unique:clasificaciones,clasificacion'],
        ]);

        $clasificacion = $clasificacionService->crear($datos);

        return response()->json([
            'message' => 'Clasificación creada correctamente.',
            'clasificacion' => $clasificacion,
        ], 201);
    }
}
