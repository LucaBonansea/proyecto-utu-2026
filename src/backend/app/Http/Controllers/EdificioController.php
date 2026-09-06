<?php

namespace App\Http\Controllers;

use App\Models\Edificio;

class EdificioController extends Controller
{
    public function index()
    {
        return response()->json(
            Edificio::all()
        );
    }
}
