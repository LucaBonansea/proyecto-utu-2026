<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index(Request $request)
    {
        $datos = $request->validate([
            'edificio_id' => ['sometimes', 'integer', 'exists:edificios,id'],
        ]);

        return response()->json(
            Area::query()
                ->with('edificio:id,nombre')
                ->withCount('reclamos')
                ->when(
                    isset($datos['edificio_id']),
                    fn ($consulta) => $consulta->where('edificio_id', $datos['edificio_id'])
                )
                ->orderBy('nombre')
                ->get()
        );
    }

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
                'max:200',
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

    public function destroy(Area $area)
    {
        if ($area->reclamos()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar un área con reclamos asociados.',
            ], 409);
        }

        $area->delete();

        return response()->json([
            'message' => 'Área eliminada correctamente.',
        ]);
    }
}
