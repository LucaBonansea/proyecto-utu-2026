<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Proveedor;

class Reclamo extends Model
{
    protected $fillable = [
        'usuario_cedula',
        'edificio_id',
        'description',
        'clasificacion_id',
        'estado',
        'prioridad',
        'motivo_rechazo',
        'proveedor_id',
    ];

    public function usuario()
    {
        return $this->belongsTo(
            Usuario::class,
            'usuario_cedula',
            'cedula'
        );
    }

    public function edificio()
    {
        return $this->belongsTo(Edificio::class);
    }

    public function evidencia()
    {
        return $this->hasMany(Evidencia::class);
    }

    public function clasificacion()
    {
        return $this->belongsTo(Clasificacion::class);
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }
}