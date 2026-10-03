<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasificacionController;
use App\Http\Controllers\EdificioController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ReclamoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
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

Route::middleware('web')->group(function () {

    Route::post('/auth/login', [
        AuthController::class,
        'login'
    ]);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/mis-edificios', [
            EdificioController::class,
            'misEdificios'
        ]);

        Route::get('/auth/me', [
            AuthController::class,
            'me'
        ]);

        Route::post('/auth/logout', [
            AuthController::class,
            'logout'
        ]);

        // Usuario de edificio: ve sus propios reclamos
        Route::get('/reclamos', [
            ReclamoController::class,
            'index'
        ]);

        // Crear reclamo
        Route::post('/reclamos', [
            ReclamoController::class,
            'store'
        ]);

        // Administrador: ve todos
        Route::get('/admin/reclamos', [ReclamoController::class,'indexAdmin']);
        Route::put('/admin/reclamos/{id}', [ReclamoController::class,'actualizar']);
        Route::put('/admin/reclamos/{id}/proveedor', [ReclamoController::class,'asignarProveedor']);
        Route::get('/proveedor/reclamos', [ProveedorController::class,'reclamos']);
        Route::put('/proveedor/reclamos/{id}/aceptar', [ProveedorController::class, 'aceptarReclamo']);
        Route::put('/proveedor/reclamos/{id}/aceptar-devolucion', [ProveedorController::class, 'aceptarDevolucion']);
        Route::post('/proveedor/reclamos/{id}/finalizar', [ProveedorController::class, 'finalizarReclamo']);
        Route::put('/reclamos/{id}/confirmar-finalizacion', [ReclamoController::class, 'confirmarFinalizacion']);
        Route::put('/reclamos/{id}/rechazar-finalizacion', [ReclamoController::class, 'rechazarFinalizacion']);
    });
});

?>
