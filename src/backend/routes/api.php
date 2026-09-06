<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasificacionController;
use App\Http\Controllers\EdificioController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ReclamoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/reclamos', [ReclamoController::class, 'store']);
Route::get('/clasificaciones', [ClasificacionController::class, 'index']);
Route::get('/edificios', [EdificioController::class, 'index']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::put('/usuarios/{cedula}/password', [UsuarioController::class, 'updatePassword']);
Route::put('/usuarios/{cedula}/rol', [UsuarioController::class, 'updateRol']);
Route::post('/edificios', [EdificioController::class, 'store']);
Route::get('/proveedores', [ProveedorController::class, 'index']);
Route::post('/proveedores', [ProveedorController::class, 'store']);
Route::put('/proveedores/{id}/estado', [ProveedorController::class, 'cambiarEstado']);

?>