<?php

namespace App\Http\Controllers;

use App\Services\ProveedorService;
use Illuminate\Http\Request;
use App\Models\Reclamo;
use App\Models\Evidencia;


class ProveedorController extends Controller
{
    public function index(ProveedorService $proveedorService)
    {
        $proveedores = $proveedorService->obtenerTodos();

        return response()->json($proveedores);
    }

    public function store(Request $request, ProveedorService $proveedorService)
    {
        $datos = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'razon_social' => ['required', 'string', 'max:255'],
            'rut' => ['required', 'string', 'max:20', 'unique:proveedores,rut'],
            'telefono' => ['required', 'string', 'max:20'],
            'direccion' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'contacto_responsable' => ['required', 'string', 'max:255'],
            'telefono_contacto' => ['required', 'string', 'max:20'],
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
            'proveedor'
        ])
        ->latest()
        ->get();

    return response()->json([
        'reclamos' => $reclamos
    ], 200);
}
public function aceptarReclamo(Request $request, string $id)
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

    if ($reclamo->estado !== 'aceptado') {
        return response()->json([
            'message' => 'El reclamo no está disponible para aceptar'
        ], 422);
    }

    $reclamo->estado = 'en_proceso';
    $reclamo->save();

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor'
    ]);

    return response()->json([
        'message' => 'Reclamo aceptado correctamente',
        'reclamo' => $reclamo
    ], 200);
}
public function finalizarReclamo(Request $request, string $id)
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
    ]);

    $ruta = $request->file('foto')->store('evidencias', 'public');

    Evidencia::create([
        'reclamo_id' => $reclamo->id,
        'ruta_archivo' => $ruta,
        'fecha_carga' => now(),
    ]);

    $reclamo->estado = 'completado';
    $reclamo->save();

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor'
    ]);

    return response()->json([
        'message' => 'Reclamo finalizado correctamente',
        'reclamo' => $reclamo
    ], 200);
}
public function aceptarDevolucion(Request $request, string $id)
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

    $reclamo->load([
        'usuario',
        'edificio',
        'clasificacion',
        'evidencia',
        'proveedor'
    ]);

    return response()->json([
        'message' => 'Devolución aceptada correctamente',
        'reclamo' => $reclamo
    ], 200);
}
}