<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LocalOnly
{
    public function handle(Request $request, Closure $next)
    {
        if (!in_array($request->ip(), ['127.0.0.1', '::1'])) {
            return response('', 403);
        }

        return $next($request);
    }
}

?>