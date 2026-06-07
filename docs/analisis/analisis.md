# Análisis del sistema

## Problema a resolver
(Describir el problema)

## Objetivo
(Qué buscan lograr)

## Actores
- Usuario
- Administrador

# Restricciones tecnicas 


Descripción

Identificar las limitaciones técnicas que pueden afectar el desarrollo del Sistema de Gestión de Reclamos Ciudadanos.

Objetivo

Conocer las restricciones para planificar correctamente el proyecto.

Restricciones identificadas
CódigoRestricción técnica
RT1	El sistema deberá desarrollarse utilizando PHP/Laravel para el backend y MySQL como sistema gestor de base de datos.
RT2	La aplicación deberá funcionar mediante una arquitectura basada en API REST.
RT3	La validación de identidad ciudadana deberá realizarse obligatoriamente mediante la API docente proporcionada por el cuerpo docente.
RT4	La integración con la API docente deberá realizarse desde el backend y no directamente desde el frontend.
RT5	Si la API docente no valida la identidad del ciudadano, el sistema no permitirá completar el registro.
RT6	El sistema deberá almacenar evidencias multimedia en el sistema de archivos definido para el proyecto.
RT7	La solución deberá ser compatible con dispositivos móviles debido al enfoque Mobile First de la interfaz ciudadana.
RT8	El proyecto deberá mantener trazabilidad mediante Git, utilizando repositorio, ramas y Pull Requests obligatorias.
RT9	El sistema deberá implementar control de roles y permisos para los diferentes tipos de usuarios.
RT10	La protección de datos personales y el registro del historial de estados serán requisitos obligatorios durante todo el desarrollo.