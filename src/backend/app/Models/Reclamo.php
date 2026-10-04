<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    /**
     * Evidencia más reciente que se muestra como imagen principal del reclamo.
     */
    public function evidencia(): HasOne
    {
        return $this->hasOne(Evidencia::class)->latestOfMany();
    }

    /**
     * Historial completo de evidencias, incluidas las fotos de resolución.
     */
    public function evidencias(): HasMany
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
