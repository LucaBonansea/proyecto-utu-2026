<?php

namespace App\Http\Controllers;

use App\Models\Clasificacion;

class ClasificacionController extends Controller
{
    public function index()
    {
        $clasificaciones = Clasificacion::all();

        return response()->json($clasificaciones);
    }
}