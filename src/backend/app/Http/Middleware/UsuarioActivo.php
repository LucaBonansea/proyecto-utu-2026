<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UsuarioActivo
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()?->activo) {
            return response()->json([
                'message' => 'El usuario está desactivado.',
            ], 403);
        }

        return $next($request);
    }
}
