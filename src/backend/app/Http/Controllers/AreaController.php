<?php

namespace App\Http\Controllers;

use App\Models\Area;

class AreaController extends Controller
{
    public function porEdificio($edificioId)
    {
        $areas = Area::where('edificio_id', $edificioId)
            ->orderBy('nombre')
            ->get();

        return response()->json($areas);
    }
}