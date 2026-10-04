<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PoliticasAceptadas
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()?->politicas_aceptadas) {
            return response()->json([
                'mensaje' => 'Debes aceptar las políticas de uso para continuar.'
            ], 403);
        }

        return $next($request);
    }
}
