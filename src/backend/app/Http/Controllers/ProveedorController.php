<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    public function index()
    {
        return response()->json(
            Proveedor::all()
        );
    }

    public function store(Request $request)
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

        $proveedor = Proveedor::create($datos);

        return response()->json([
            'message' => 'Proveedor creado correctamente',
            'proveedor' => $proveedor,
        ], 201);
    }
    public function cambiarEstado(string $id)
    {
        $proveedor = Proveedor::findOrFail($id);

        $proveedor->estado =
            $proveedor->estado === 'Activo'
                ? 'Inactivo'
                : 'Activo';

        $proveedor->save();

        return response()->json([
            'message' => 'Estado actualizado correctamente',
            'proveedor' => $proveedor,
        ]);
    }
}