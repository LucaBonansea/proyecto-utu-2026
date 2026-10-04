<?php

namespace App\Models;

use App\Models\Reclamo;
use Illuminate\Database\Eloquent\Model;

class Evidencia extends Model
{
    protected $fillable = [
        'reclamo_id',
        'ruta_archivo',
        'observaciones',
        'fecha_carga',
    ];

    public function reclamo()
    {
        return $this->belongsTo(Reclamo::class);
    }
}
