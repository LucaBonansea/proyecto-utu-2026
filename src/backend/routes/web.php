<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::post('/auth/login', [
        AuthController::class,
        'login'
    ])->middleware('throttle:5,1');

    Route::post('/auth/logout', [
        AuthController::class,
        'logout'
    ])->middleware('auth:sanctum');
});