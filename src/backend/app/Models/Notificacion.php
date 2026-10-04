<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    protected $fillable = [
        'usuario_cedula',
        'titulo',
        'mensaje',
        'tipo',
        'reclamo_id',
        'leida',
    ];

    protected $casts = [
        'leida' => 'boolean',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_cedula', 'cedula');
    }

    public function reclamo(): BelongsTo
    {
        return $this->belongsTo(Reclamo::class);
    }
}
