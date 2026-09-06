<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reclamo extends Model
{
    protected $fillable = [
        'user_id',
        'edificio_id',
        'description',
        'clasificacion_id',
        'estado',
    ];

    public function evidencia()
    {
        return $this->hasOne(Evidencia::class);
    }

    public function clasificacion()
    {
        return $this->belongsTo(Clasificacion::class);
    }
}
