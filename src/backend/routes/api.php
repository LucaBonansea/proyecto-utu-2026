<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClasificacionController;
use App\Http\Controllers\EdificioController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ReclamoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Middleware\Administrador;
use App\Http\Middleware\PoliticasAceptadas;
use App\Http\Middleware\UsuarioActivo;
use Illuminate\Support\Facades\Route;

// Única ruta pública: inicia la sesión (el usuario todavía no está autenticado)
Route::post('/auth/login', [AuthController::class,'login']);
// Todo lo de abajo exige sesión iniciada (Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // Aceptar políticas: va fuera del grupo siguiente para que un usuario
    // que aún no las aceptó pueda hacerlo
    Route::post('/auth/aceptar-politicas', [AuthController::class,'aceptarPoliticas']);

    // Cerrar sesión: también fuera del grupo siguiente, para poder salir
    // aunque no haya aceptado las políticas
    Route::post('/auth/logout', [AuthController::class,'logout']);

    // Desde acá: usuario activo y con políticas aceptadas
    Route::middleware([UsuarioActivo::class, PoliticasAceptadas::class])->group(function () {

        // ---------- Solo administrador ----------
        Route::middleware(Administrador::class)->group(function () {

            // Listar usuarios
            Route::get('/usuarios', [UsuarioController::class, 'index']);
            // Crear usuario (alta hecha por el administrador)
            Route::post('/usuarios', [UsuarioController::class, 'store']);
            // Cambiar la contraseña de un usuario
            Route::put('/usuarios/{cedula}/password', [UsuarioController::class, 'updatePassword']);
            // Cambiar el rol de un usuario
            Route::put('/usuarios/{cedula}/rol', [UsuarioController::class, 'updateRol']);
            // Desactivar un usuario (no podrá volver a iniciar sesión)
            Route::put('/usuarios/{cedula}/desactivar', [UsuarioController::class, 'desactivar']);
            // Crear edificio
            Route::post('/edificios', [EdificioController::class, 'store']);
            // Crear proveedor
            Route::post('/proveedores', [ProveedorController::class, 'store']);
            // Activar o desactivar un proveedor
            Route::put('/proveedores/{id}/estado', [ProveedorController::class, 'cambiarEstado']);
            // Crear clasificación de reclamos
            Route::post('/clasificaciones', [ClasificacionController::class, 'store']);
        });

        // ---------- Catálogos y datos de consulta ----------

        // Listar todos los edificios (panel de administración)
        Route::get('/edificios', [EdificioController::class, 'index']);
        // Listar clasificaciones (se usan al crear un reclamo)
        Route::get('/clasificaciones', [ClasificacionController::class, 'index']);
        // Edificios que pertenecen al usuario logueado
        Route::get('/mis-edificios', [EdificioController::class,'misEdificios']);
        // Listar proveedores (los usa el personal al asignar un reclamo)
        Route::get('/proveedores', [ProveedorController::class, 'index']);

        // ---------- Sesión y notificaciones ----------

        // Datos del usuario logueado (el frontend lo usa para verificar la sesión)
        Route::get('/auth/me', [AuthController::class,'me']);
        // Listar notificaciones del usuario
        Route::get('/notificaciones', [NotificacionController::class, 'index']);
        // Marcar una notificación como leída
        Route::put('/notificaciones/{id}/leer', [NotificacionController::class, 'marcarComoLeida']);
        // Marcar todas las notificaciones como leídas
        Route::put('/notificaciones/leer-todas', [NotificacionController::class, 'marcarTodasLeidas']);

        // ---------- Reclamos del usuario de edificio ----------

        // Listar los reclamos propios (con paginación y filtro)
        Route::get('/reclamos', [ReclamoController::class,'index']);
        // Crear un reclamo (con foto de evidencia)
        Route::post('/reclamos', [ReclamoController::class,'store']);
        // Cancelar un reclamo propio (solo si sigue pendiente)
        Route::delete('/reclamos/{id}', [ReclamoController::class,'destroy']);

        // ---------- Moderación (administrador y administrativo) ----------

        // Listar los reclamos pendientes de moderación
        Route::get('/admin/reclamos', [ReclamoController::class,'indexAdmin']);
        // Moderar un reclamo: corrige la descripción, fija la prioridad, asigna
        // proveedor, lo pasa a "aceptado" y notifica (lo usa el administrativo)
        Route::put('/admin/reclamos/{id}', [ReclamoController::class,'actualizar']);

        // ---------- Proveedor ----------

        // Listar los reclamos asignados al proveedor
        Route::get('/proveedor/reclamos', [ProveedorController::class,'reclamos']);
        // Aceptar un reclamo asignado (pasa a "en proceso")
        Route::put('/proveedor/reclamos/{id}/aceptar', [ProveedorController::class, 'aceptarReclamo']);
        // Aceptar la devolución cuando el usuario rechazó la solución
        Route::put('/proveedor/reclamos/{id}/aceptar-devolucion', [ProveedorController::class, 'aceptarDevolucion']);
        // Finalizar un reclamo subiendo foto y observaciones
        Route::post('/proveedor/reclamos/{id}/finalizar', [ProveedorController::class, 'finalizarReclamo']);

        // ---------- Confirmación del usuario de edificio ----------

        // Confirmar que el reclamo quedó resuelto
        Route::put('/reclamos/{id}/confirmar-finalizacion', [ReclamoController::class, 'confirmarFinalizacion']);
        // Rechazar la solución indicando el motivo
        Route::put('/reclamos/{id}/rechazar-finalizacion', [ReclamoController::class, 'rechazarFinalizacion']);
    
        // ---------- Áreas de los edificios ----------
        // Listar las áreas de un edificio
        // Mostrar las areas de los edificios de sus reclamos Rol: Usuario_edificio
        Route::get('/edificios/{edificio}/areas', [AreaController::class, 'porEdificio']);
    });
});