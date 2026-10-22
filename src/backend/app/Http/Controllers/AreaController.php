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

     public function store(Request $request)
    {
        $datos = $request->validate([
            'edificio_id' => [
                'required',
                'integer',
                'exists:edificios,id',
            ],

            'nombre' => [
                'required',
                'string',
                'max:255',
            ],

            'descripcion' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);

        $existe = Area::where('edificio_id', $datos['edificio_id'])
            ->where('nombre', $datos['nombre'])
            ->exists();

        if ($existe) {
            return response()->json([
                'message' => 'Ya existe un área con ese nombre en este edificio.'
            ], 422);
        }

        $area = Area::create([
            'edificio_id' => $datos['edificio_id'],
            'nombre' => $datos['nombre'],
            'descripcion' => $datos['descripcion'] ?? null,
        ]);

        return response()->json([
            'message' => 'Área creada correctamente.',
            'area' => $area,
        ], 201);
    }
}