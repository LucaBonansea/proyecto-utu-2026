<?php

namespace App\Http\Controllers;

use App\Services\EdificioService;
use Illuminate\Http\Request;

class EdificioController extends Controller
{
    public function index(EdificioService $edificioService)
    {
        $edificios = $edificioService->obtenerTodos();

        return response()->json($edificios);
    }

    public function store(Request $request, EdificioService $edificioService)
    {
        $datos = $request->validate([
            'nombre' => [
                'required',
                'string',
                'max:255'
            ],

            'direccion' => [
                'required',
                'string',
                'max:255'
            ],
        ]);

        $edificio = $edificioService->crear($datos);

        return response()->json([
            'message' => 'Edificio creado correctamente',
            'edificio' => $edificio,
        ], 201);
    }
}