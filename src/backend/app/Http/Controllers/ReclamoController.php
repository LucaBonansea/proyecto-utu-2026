<?php

namespace App\Http\Controllers;

use App\Models\Reclamo;
use App\Models\Evidencia;
use Illuminate\Http\Request;

class ReclamoController extends Controller
{
    public function store(Request $request)
    {
        $incomingFields = $request->validate([
            'edificio_id' => ['required', 'exists:edificios,id'],
            'description' => ['required', 'string', 'max:200'],
            'clasificacion_id' => ['required', 'exists:clasificaciones,id'],
            'photo' => ['required', 'image', 'max:10000'],
        ]);

        $reclamo = Reclamo::create([
            'user_id' => auth()->id(),
            'edificio_id' => $incomingFields['edificio_id'],
            'description' => $incomingFields['description'],
            'clasificacion_id' => $incomingFields['clasificacion_id'],
            'estado' => 'pendiente',
        ]);

        $path = $request->file('photo')->store('reclamos', 'public');

        Evidencia::create([
            'reclamo_id' => $reclamo->id,
            'ruta_archivo' => $path,
            'fecha_carga' => now(),
        ]);

        return response()->json([
            'message' => 'Reclamo creado correctamente',
            'reclamo' => $reclamo,
        ], 201);
    }
}