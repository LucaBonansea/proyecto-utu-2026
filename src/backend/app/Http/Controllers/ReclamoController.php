<?php

namespace App\Http\Controllers;

use App\Services\NotificacionService;
use App\Services\ReclamoService;
use Illuminate\Http\Request;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ReclamoController extends Controller
{
    public function index(
        Request $request,
        ReclamoService $reclamoService
    ) {
        $datos = $request->validate([
            'page' => [
                'sometimes',
                'integer',
                'min:1'
            ],
            'filtro' => [
                'sometimes',
                'string',
                'in:todos,resueltos,proceso'
            ],
        ]);

        $reclamos = $reclamoService->obtenerPorUsuario(
            $request->user()->cedula,
            $datos['filtro'] ?? 'todos',
            12
        );
        $estadisticas = $reclamoService->obtenerEstadisticasPorUsuario(
            $request->user()->cedula
        );

        return response()->json([
            'reclamos' => $reclamos->items(),
            'estadisticas' => $estadisticas,
            'paginacion' => [
                'pagina_actual' => $reclamos->currentPage(),
                'ultima_pagina' => $reclamos->lastPage(),
                'por_pagina' => $reclamos->perPage(),
                'total' => $reclamos->total(),
                'desde' => $reclamos->firstItem(),
                'hasta' => $reclamos->lastItem(),
            ],
        ], 200);
    }

    public function store(
        Request $request,
        ReclamoService $reclamoService,
        NotificacionService $notificacionService
    ) {
        $datos = $request->validate([
            'edificio_id' => [
                'required',
                'exists:edificios,id'
            ],

            'description' => [
                'required',
                'string',
                'max:200'
            ],

            'clasificacion_id' => [
                'required',
                'exists:clasificaciones,id'
            ],

            'photo' => [
                'required',
                'mimes:jpg,jpeg,png,bmp,gif,svg,webp,avif,heic,heif',
                'max:10000'
            ],
        ]);

        $edificioPerteneceAlUsuario = $request->user()
            ->edificios()
            ->whereKey($datos['edificio_id'])
            ->exists();

        if (!$edificioPerteneceAlUsuario) {
            return response()->json([
                'message' => 'El edificio seleccionado no pertenece al usuario.',
            ], 403);
        }

        $reclamo = $reclamoService->crear(
            $datos,
            $request->user()->cedula
        );

        $notificacionService->crear(
            $request->user()->cedula,
            'Reclamo recibido',
            'Tu reclamo fue registrado correctamente.',
            'reclamo_creado',
            $reclamo->id
        );

        return response()->json([
            'message' => 'Reclamo creado correctamente',
            'reclamo' => $reclamo,
        ], 201);
    }

    public function destroy(
        Request $request,
        int $id,
        NotificacionService $notificacionService
    ) {
        $rutasEvidencias = DB::transaction(function () use (
            $request,
            $id,
            $notificacionService
        ) {
            $reclamo = Reclamo::query()
                ->with('evidencias')
                ->lockForUpdate()
                ->findOrFail($id);

            if ($reclamo->usuario_cedula !== $request->user()->cedula) {
                abort(403, 'No autorizado');
            }

            if ($reclamo->estado !== 'pendiente') {
                abort(422, 'Solo se puede cancelar un reclamo que esté enviado.');
            }

            $rutas = $reclamo->evidencias
                ->pluck('ruta_archivo')
                ->filter()
                ->values()
                ->all();

            $notificacionService->eliminarDeReclamo(
                $reclamo->id,
                $request->user()->cedula,
                'reclamo_creado'
            );

            $reclamo->delete();

            return $rutas;
        });

        if ($rutasEvidencias !== []) {
            Storage::disk('public')->delete($rutasEvidencias);
        }

        return response()->json([
            'message' => 'Reclamo cancelado correctamente.',
        ], 200);
    }

    public function indexAdmin(Request $request,ReclamoService $reclamoService) {
        
        if ($request->user()->rol !== 'administrador' && $request->user()->rol !== 'administrativo') {
            return response()->json([
                'message' => 'No autorizado'
            ], 403);
        }

        $reclamos = $reclamoService->obtenerPendientes();

        return response()->json([
            'reclamos' => $reclamos
        ], 200);
    }
    public function asignarProveedor(
        Request $request,
        int $id
    ) {
    if ($request->user()->rol !== 'administrador') {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    $datos = $request->validate([
        'proveedor_id' => [
            'required',
            'exists:proveedores,id'
        ],
    ]);

    $reclamo = Reclamo::findOrFail($id);

    $reclamo->update([
        'proveedor_id' => $datos['proveedor_id'],
    ]);

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor'
    ]);

    return response()->json([
        'message' => 'Proveedor asignado correctamente',
        'reclamo' => $reclamo,
    ], 200);
}

public function actualizar(
    Request $request,
    int $id,
    NotificacionService $notificacionService
) {
if ($request->user()->rol !== 'administrativo') {
    return response()->json([
        'message' => 'No autorizado'
    ], 403);
}

$datos = $request->validate([
    'description' => [
        'required',
        'string',
        'max:200'
    ],

    'prioridad' => [
        'required',
        'string',
        'in:Normal,Urgente'
    ],

    'proveedor_id' => [
        'required',
        'exists:proveedores,id'
    ],
]);

$reclamo = Reclamo::findOrFail($id);

$reclamo->update([
    'description' => $datos['description'],
    'prioridad' => $datos['prioridad'],
    'proveedor_id' => $datos['proveedor_id'],
    'estado' => 'aceptado',
]);

$notificacionService->crear(
    $reclamo->usuario_cedula,
    'Reclamo aceptado',
    'Tu reclamo fue revisado y asignado a un proveedor.',
    'reclamo_aceptado',
    $reclamo->id
);

if ($reclamo->proveedor_id) {
    $proveedorUsuario = Usuario::where('proveedor_id', $reclamo->proveedor_id)->first();
    if ($proveedorUsuario) {
        $notificacionService->crear(
            $proveedorUsuario->cedula,
            'Nuevo trabajo asignado',
            'Tenés un nuevo reclamo asignado.',
            'nuevo_trabajo_asignado',
            $reclamo->id
        );
    }
}

$reclamo->load([
    'usuario',
    'edificio',
    'clasificacion',
    'evidencia',
    'proveedor'
]);

return response()->json([
    'message' => 'Reclamo actualizado correctamente',
    'reclamo' => $reclamo,
], 200);
}
public function confirmarFinalizacion(
    Request $request,
    int $id,
    NotificacionService $notificacionService
) {
    $reclamo = Reclamo::findOrFail($id);

    if ($reclamo->usuario_cedula !== $request->user()->cedula) {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    if ($reclamo->estado !== 'completado') {
        return response()->json([
            'message' => 'El reclamo no está pendiente de confirmación'
        ], 422);
    }

    $reclamo->update([
        'estado' => 'finalizacion_confirmada',
        'motivo_rechazo' => null,
    ]);

    $notificacionService->crear(
        $reclamo->usuario_cedula,
        'Reclamo finalizado',
        'La solución quedó confirmada.',
        'finalizacion_confirmada',
        $reclamo->id
    );

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor'
    ]);

    return response()->json([
        'message' => 'Finalización confirmada correctamente',
        'reclamo' => $reclamo,
    ], 200);
}

public function rechazarFinalizacion(
    Request $request,
    int $id,
    NotificacionService $notificacionService
) {
    $reclamo = Reclamo::findOrFail($id);

    if ($reclamo->usuario_cedula !== $request->user()->cedula) {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    if ($reclamo->estado !== 'completado') {
        return response()->json([
            'message' => 'El reclamo no está pendiente de confirmación'
        ], 422);
    }

    $datos = $request->validate([
        'motivo_rechazo' => [
            'required',
            'string',
            'max:500'
        ],
    ]);

    $reclamo->update([
        'estado' => 'rechazada',
        'motivo_rechazo' => $datos['motivo_rechazo'],
    ]);

    if ($reclamo->proveedor_id) {
        $proveedorUsuario = Usuario::where('proveedor_id', $reclamo->proveedor_id)->first();
        if ($proveedorUsuario) {
            $notificacionService->crear(
                $proveedorUsuario->cedula,
                'Solución rechazada',
                'El usuario rechazó la solución. Revisá el motivo.',
                'reclamo_rechazado',
                $reclamo->id
            );
        }
    }

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor'
    ]);

    return response()->json([
        'message' => 'Finalización rechazada correctamente',
        'reclamo' => $reclamo,
    ], 200);
}
}
