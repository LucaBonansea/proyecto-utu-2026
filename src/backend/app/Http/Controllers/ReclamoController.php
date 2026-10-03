<?php

namespace App\Http\Controllers;

use App\Services\ReclamoService;
use Illuminate\Http\Request;

class ReclamoController extends Controller
{
    public function index(
        Request $request,
        ReclamoService $reclamoService
    ) {
        $datos = $request->validate([
            'page' => [
                'sometimes',
                'integer',
                'min:1'
            ],
            'filtro' => [
                'sometimes',
                'string',
                'in:todos,resueltos,proceso'
            ],
        ]);

        $reclamos = $reclamoService->obtenerPorUsuario(
            $request->user()->cedula,
            $datos['filtro'] ?? 'todos',
            12
        );

        return response()->json([
            'reclamos' => $reclamos->items(),
            'paginacion' => [
                'pagina_actual' => $reclamos->currentPage(),
                'ultima_pagina' => $reclamos->lastPage(),
                'por_pagina' => $reclamos->perPage(),
                'total' => $reclamos->total(),
                'desde' => $reclamos->firstItem(),
                'hasta' => $reclamos->lastItem(),
            ],
        ], 200);
    }

    public function store(
        Request $request,
        ReclamoService $reclamoService
    ) {
        $datos = $request->validate([
            'edificio_id' => [
                'required',
                'exists:edificios,id'
            ],

            'description' => [
                'required',
                'string',
                'max:200'
            ],

            'clasificacion_id' => [
                'required',
                'exists:clasificaciones,id'
            ],

            'photo' => [
                'required',
                'image',
                'max:10000'
            ],
        ]);

        $reclamo = $reclamoService->crear(
            $datos,
            $request->user()->cedula
        );

        return response()->json([
            'message' => 'Reclamo creado correctamente',
            'reclamo' => $reclamo,
        ], 201);
    }

    public function indexAdmin(
    Request $request,
    ReclamoService $reclamoService
) {
    if ($request->user()->rol !== 'administrador') {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    $reclamos = $reclamoService->obtenerTodos();

    return response()->json([
        'reclamos' => $reclamos
    ], 200);
}
}
