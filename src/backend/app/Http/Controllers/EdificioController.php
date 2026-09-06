<?php

namespace App\Http\Controllers;

use App\Models\Edificio;
use Illuminate\Http\Request;

class EdificioController extends Controller
{
    public function index()
    {
        return response()->json(
            Edificio::all()
        );
    }



    public function store(Request $request)
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

        $edificio = Edificio::create([
            'nombre' => $datos['nombre'],
            'direccion' => $datos['direccion'],
        ]);

        return response()->json([
            'message' => 'Edificio creado correctamente',
            'edificio' => $edificio,
        ], 201);
    }

}
