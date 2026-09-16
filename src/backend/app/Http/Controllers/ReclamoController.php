<?php

namespace App\Http\Controllers;

use App\Services\ReclamoService;
use Illuminate\Http\Request;

class ReclamoController extends Controller
{
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
}