<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{

   
    public function index()
    {
        $usuarios = Usuario::with(['edificios', 'proveedor'])->get();

        return response()->json($usuarios);
    }

    public function store(Request $request)
{
    $datos = $request->validate([

        'cedula' => [
            'required',
            'string',
            'max:20',
            'unique:usuarios,cedula'
        ],

        'nombre' => [
            'required',
            'string',
            'max:100'
        ],

        'telefono' => [
            'nullable',
            'string',
            'max:30'
        ],

        'email' => [
            'nullable',
            'email',
            'max:150'
        ],

        'password' => [
            'required',
            'string',
            'min:6'
        ],

        'rol' => [
            'required',
            Rule::in([
                'usuario_edificio',
                'administrador',
                'administrativo',
                'usuario_proveedor'
            ])
        ],

        'edificio' => [
            'nullable',
            'required_if:rol,usuario_edificio',
            'exists:edificios,id'
        ],

        'proveedor' => [
            'nullable',
            'required_if:rol,usuario_proveedor',
            'exists:proveedores,id'
        ],

    ]);


    $usuario = Usuario::create([

        'cedula' => $datos['cedula'],

        'nombre' => $datos['nombre'],

        'telefono' => $datos['telefono'] ?? null,

        'email' => $datos['email'] ?? null,

        'password' => Hash::make(
            $datos['password']
        ),

        'rol' => $datos['rol'],

        'activo' => true,

    ]);


    // ==============================
    // EDIFICIO
    // ==============================

    if (
        $datos['rol'] === 'usuario_edificio' &&
        !empty($datos['edificio'])
    ) {

        $usuario->edificios()->attach(
            $datos['edificio']
        );

    }


    // ==============================
    // PROVEEDOR
    // ==============================

    if (
        $datos['rol'] === 'usuario_proveedor' &&
        !empty($datos['proveedor'])
    ) {

        $usuario->proveedor_id =
            $datos['proveedor'];

        $usuario->save();

    }


    return response()->json([
        'message' => 'Usuario creado correctamente',
        'usuario' => $usuario->load(['edificios', 'proveedor']),
    ], 201);
}

    public function updatePassword(
        Request $request,
        string $cedula
    ) {
        $datos = $request->validate([
            'password' => [
                'required',
                'string',
                'min:6'
            ],
        ]);

        $usuario = Usuario::findOrFail($cedula);

        $usuario->update([
            'password' => Hash::make(
                $datos['password']
            ),
        ]);

        return response()->json([
            'message' => 'Contraseña actualizada correctamente',
        ]);
    }

    public function updateRol(Request $request,string $cedula) {
        $datos = $request->validate([
            'rol' => [
                'required',
                Rule::in([
                    'usuario_edificio',
                    'administrador',
                    'administrativo',
                    'usuario_proveedor'
                ])
            ],

            'edificio' => [
                'nullable',
                'required_if:rol,usuario_edificio',
                'exists:edificios,id'
            ],

            'proveedor' => [
                'nullable',
                'required_if:rol,usuario_proveedor',
                'exists:proveedores,id'
            ],
        ]);

        $usuario = Usuario::findOrFail($cedula);

        $usuario->update([
            'rol' => $datos['rol'],
        ]);

        // Edificio: se desvincula y se vuelve a vincular si corresponde
        $usuario->edificios()->detach();

        if (
            $datos['rol'] === 'usuario_edificio' &&
            !empty($datos['edificio'])
        ) {
            $usuario->edificios()->attach(
                $datos['edificio']
            );
        }

        // Proveedor: se limpia y se reasigna si corresponde
        $usuario->proveedor_id =
            $datos['rol'] === 'usuario_proveedor'
                ? $datos['proveedor']
                : null;

        $usuario->save();

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'usuario' => $usuario->load(['edificios', 'proveedor']),
        ]);
    }
}
