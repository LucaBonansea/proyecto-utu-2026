<?php

namespace App\Http\Controllers;

use App\Services\NotificacionService;
use App\Services\ProveedorService;
use Illuminate\Http\Request;
use App\Models\Reclamo;
use App\Models\Evidencia;
use Illuminate\Validation\Rule;


class ProveedorController extends Controller
{
    public function index(ProveedorService $proveedorService)
    {
        $proveedores = $proveedorService->obtenerTodos();

        return response()->json($proveedores);
    }

    public function store(Request $request, ProveedorService $proveedorService)
    {
        $camposNormalizados = [];

        foreach (['rut', 'telefono', 'telefono_contacto'] as $campo) {
            $valor = $request->input($campo);

            if (is_string($valor)) {
                $camposNormalizados[$campo] = preg_replace('/[\s().-]+/u', '', $valor);
            }
        }

        $request->merge($camposNormalizados);

        $datos = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'razon_social' => ['required', 'string', 'max:255'],
            'rut' => ['bail', 'required', 'string', 'regex:/^\d{12}$/', Rule::unique('proveedores', 'rut')],
            'telefono' => ['required', 'string', 'regex:/^(?:\d{8,9}|\+598\d{8})$/'],
            'direccion' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'contacto_responsable' => ['required', 'string', 'max:255'],
            'telefono_contacto' => ['required', 'string', 'regex:/^(?:\d{8,9}|\+598\d{8})$/'],
            'email_contacto' => ['required', 'email', 'max:255'],
        ]);

        $proveedor = $proveedorService->crear($datos);

        return response()->json([
            'message' => 'Proveedor creado correctamente',
            'proveedor' => $proveedor,
        ], 201);
    }

    public function cambiarEstado(
        string $id,
        ProveedorService $proveedorService
    ) {
        $proveedor = $proveedorService->cambiarEstado($id);

        return response()->json([
            'message' => 'Estado actualizado correctamente',
            'proveedor' => $proveedor,
        ]);
    }

    public function reclamos(Request $request)
{
    $usuario = $request->user();

    if ($usuario->rol !== 'usuario_proveedor') {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    if (!$usuario->proveedor_id) {
        return response()->json([
            'message' => 'El usuario no tiene un proveedor asignado'
        ], 422);
    }

    $reclamos = Reclamo::where('proveedor_id', $usuario->proveedor_id)
        ->with([
            'usuario',
            'edificio',
            'clasificacion',
            'evidencia',
            'proveedor',
            'area'
        ])
        ->latest()
        ->get();

    return response()->json([
        'reclamos' => $reclamos
    ], 200);
}
public function aceptarReclamo(Request $request, string $id, NotificacionService $notificacionService)
{
    $usuario = $request->user();

    if ($usuario->rol !== 'usuario_proveedor') {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    if (!$usuario->proveedor_id) {
        return response()->json([
            'message' => 'El usuario no tiene un proveedor asignado'
        ], 422);
    }

    $reclamo = Reclamo::with('area')->find($id);

    if (!$reclamo) {
        return response()->json([
            'message' => 'Reclamo no encontrado'
        ], 404);
    }

    if ((int) $reclamo->proveedor_id !== (int) $usuario->proveedor_id) {
        return response()->json([
            'message' => 'El reclamo no pertenece a tu proveedor'
        ], 403);
    }

    if ($reclamo->estado !== 'aceptado') {
        return response()->json([
            'message' => 'El reclamo no está disponible para aceptar'
        ], 422);
    }

    $reclamo->estado = 'en_proceso';
    $reclamo->save();

    $notificacionService->crear(
        $reclamo->usuario_cedula,
        'Trabajo en proceso',
        'El proveedor comenzó a trabajar en tu reclamo.',
        'trabajo_iniciado',
        $reclamo->id
    );

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor',
        'area'
    ]);

    return response()->json([
        'message' => 'Reclamo aceptado correctamente',
        'reclamo' => $reclamo
    ], 200);
}

public function finalizarReclamo(Request $request, string $id, NotificacionService $notificacionService)
{
    $usuario = $request->user();

    if ($usuario->rol !== 'usuario_proveedor') {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    if (!$usuario->proveedor_id) {
        return response()->json([
            'message' => 'El usuario no tiene un proveedor asignado'
        ], 422);
    }

    $reclamo = Reclamo::find($id);

    if (!$reclamo) {
        return response()->json([
            'message' => 'Reclamo no encontrado'
        ], 404);
    }

    if ((int) $reclamo->proveedor_id !== (int) $usuario->proveedor_id) {
        return response()->json([
            'message' => 'El reclamo no pertenece a tu proveedor'
        ], 403);
    }

    if ($reclamo->estado !== 'en_proceso') {
        return response()->json([
            'message' => 'El reclamo debe estar en proceso para poder finalizarlo'
        ], 422);
    }

    $datos = $request->validate([
        'foto' => ['required', 'image', 'max:10240'],
        'observaciones' => ['required', 'string', 'max:500'],
        'costo_mano_obra' => ['required', 'numeric', 'decimal:0,2', 'min:0', 'max:99999999.99'],
        'costo_materiales' => ['required', 'numeric', 'decimal:0,2', 'min:0', 'max:99999999.99'],
    ]);

    $ruta = $request->file('foto')->store('evidencias', 'public');

    Evidencia::create([
        'reclamo_id' => $reclamo->id,
        'ruta_archivo' => $ruta,
        'observaciones' => $datos['observaciones'],
        'fecha_carga' => now(),
    ]);

    $reclamo->costo_mano_obra = $datos['costo_mano_obra'];
    $reclamo->costo_materiales = $datos['costo_materiales'];
    $reclamo->estado = 'completado';
    $reclamo->save();

    $notificacionService->crear(
        $reclamo->usuario_cedula,
        'Trabajo finalizado',
        'El proveedor marcó el trabajo como terminado. Revisá la solución.',
        'trabajo_completado',
        $reclamo->id
    );

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor',
        'area'
    ]);

    return response()->json([
        'message' => 'Reclamo finalizado correctamente',
        'reclamo' => $reclamo
    ], 200);
}

public function aceptarDevolucion(Request $request, string $id, NotificacionService $notificacionService)
{
    $usuario = $request->user();

    if ($usuario->rol !== 'usuario_proveedor') {
        return response()->json([
            'message' => 'No autorizado'
        ], 403);
    }

    if (!$usuario->proveedor_id) {
        return response()->json([
            'message' => 'El usuario no tiene un proveedor asignado'
        ], 422);
    }

    $reclamo = Reclamo::find($id);

    if (!$reclamo) {
        return response()->json([
            'message' => 'Reclamo no encontrado'
        ], 404);
    }

    if ((int) $reclamo->proveedor_id !== (int) $usuario->proveedor_id) {
        return response()->json([
            'message' => 'El reclamo no pertenece a tu proveedor'
        ], 403);
    }

    if ($reclamo->estado !== 'rechazada') {
        return response()->json([
            'message' => 'El reclamo no está rechazado'
        ], 422);
    }

    $reclamo->estado = 'en_proceso';
    $reclamo->motivo_rechazo = null;
    $reclamo->save();

    $notificacionService->crear(
        $reclamo->usuario_cedula,
        'Reclamo nuevamente en proceso',
        'El proveedor retomó el trabajo.',
        'devolucion',
        $reclamo->id
    );

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor',
        'area'
    ]);

    return response()->json([
        'message' => 'Devolución aceptada correctamente',
        'reclamo' => $reclamo
    ], 200);
}
}
