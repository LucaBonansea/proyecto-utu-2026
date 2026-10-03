<?php

namespace Database\Seeders;

use App\Models\Clasificacion;
use App\Models\Edificio;
use App\Models\Evidencia;
use App\Models\Reclamo;
use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class ReclamosPruebaSeeder extends Seeder
{
    private const CEDULA_USUARIO = '57620259';

    private const DESCRIPCIONES = [
        'Luminaria apagada en el acceso principal',
        'Filtración de agua en el techo del pasillo',
        'Puerta de emergencia que no cierra correctamente',
        'Baldosas flojas junto a la entrada del edificio',
        'Ascensor fuera de servicio en horario laboral',
        'Ventana rota en una sala de atención al público',
        'Humedad visible en la pared del subsuelo',
        'Pérdida de agua en uno de los baños',
        'Enchufe deteriorado en una oficina administrativa',
        'Señalización de salida de emergencia dañada',
    ];

    private const ESTADOS = [
        'pendiente',
        'validado',
        'en_proceso',
        'completado',
    ];

    public function run(): void
    {
        $usuario = Usuario::find(self::CEDULA_USUARIO);

        if (!$usuario) {
            throw new RuntimeException(
                'No existe el usuario de prueba con cédula '
                . self::CEDULA_USUARIO
            );
        }

        $edificios = Edificio::orderBy('id')->pluck('id')->values();
        $clasificaciones = Clasificacion::orderBy('id')
            ->pluck('id')
            ->values();

        if ($edificios->isEmpty() || $clasificaciones->isEmpty()) {
            throw new RuntimeException(
                'Se necesitan edificios y clasificaciones antes de crear reclamos.'
            );
        }

        $disco = Storage::disk('public');
        $reclamosAnteriores = Reclamo::with('evidencia')
            ->where('usuario_cedula', self::CEDULA_USUARIO)
            ->get();
        $rutasAnteriores = $reclamosAnteriores
            ->pluck('evidencia.ruta_archivo')
            ->filter()
            ->values();
        $rutaOrigen = $rutasAnteriores->first(
            fn (string $ruta) => $disco->exists($ruta)
        );

        if (!$rutaOrigen) {
            throw new RuntimeException(
                'No se encontró una imagen real en el almacenamiento de Docker.'
            );
        }

        $imagen = $disco->get($rutaOrigen);
        $rutasNuevas = collect(range(1, count(self::DESCRIPCIONES)))
            ->map(fn (int $numero) => sprintf(
                'reclamos/prueba/reclamo-%02d.jpg',
                $numero
            ));

        DB::transaction(function () use (
            $edificios,
            $clasificaciones,
            $rutasNuevas
        ): void {
            Reclamo::where(
                'usuario_cedula',
                self::CEDULA_USUARIO
            )->delete();

            foreach (self::DESCRIPCIONES as $indice => $descripcion) {
                $fecha = now()->subDays($indice);
                $reclamo = Reclamo::forceCreate([
                    'usuario_cedula' => self::CEDULA_USUARIO,
                    'edificio_id' => $edificios[$indice % $edificios->count()],
                    'description' => $descripcion,
                    'clasificacion_id' => $clasificaciones[
                        $indice % $clasificaciones->count()
                    ],
                    'estado' => self::ESTADOS[
                        $indice % count(self::ESTADOS)
                    ],
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ]);

                Evidencia::forceCreate([
                    'reclamo_id' => $reclamo->id,
                    'ruta_archivo' => $rutasNuevas[$indice],
                    'fecha_carga' => $fecha,
                    'created_at' => $fecha,
                    'updated_at' => $fecha,
                ]);
            }
        });

        $disco->delete($rutasAnteriores->all());

        foreach ($rutasNuevas as $ruta) {
            $disco->put($ruta, $imagen);
        }

        $this->command?->info(
            'Se reemplazaron los reclamos del usuario por 10 reclamos de prueba.'
        );
    }
}
