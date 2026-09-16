<?php

namespace App\Http\Controllers;

use App\Services\ProveedorService;
use Illuminate\Http\Request;

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
}