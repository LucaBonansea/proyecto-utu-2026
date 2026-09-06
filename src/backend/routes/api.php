<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasificacionController;
use App\Http\Controllers\EdificioController;
use App\Http\Controllers\ReclamoController;
use App\Models\Clasificacion;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/reclamos', [ReclamoController::class, 'store']);
Route::get('/clasificaciones', function () {
    return response()->json(Clasificacion::all());
});
Route::get('/clasificaciones', [ClasificacionController::class, 'index']);
Route::get('/edificios', [EdificioController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
});
?>