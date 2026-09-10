<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reclamo extends Model
{
    protected $fillable = [
        'usuario_cedula',
        'edificio_id',
        'description',
        'clasificacion_id',
        'estado',
    ];

    public function usuario(){
        return $this->belongsTo(
            Usuario::class,
            'usuario_cedula',
            'cedula'
        );
    }

    public function evidencia()
    {
        return $this->hasOne(Evidencia::class);
    }

    public function clasificacion()
    {
        return $this->belongsTo(Clasificacion::class);
    }
}
