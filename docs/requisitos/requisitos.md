# Requisitos del sistema

## Requerimientos funcionales
- (Ej: El usuario puede iniciar sesión)
- (Ej: El usuario puede registrarse)

## Requerimientos no funcionales

RNF1: La aplicación deberá desarrollarse como una Progressive Web App (PWA), permitiendo su uso eficiente desde teléfonos móviles, con una interfaz optimizada para pantallas pequeñas y acceso rápido desde el navegador sin necesidad de instalación tradicional.

RNF2: El dashboard administrativo deberá ser completamente responsive, adaptándose correctamente a diferentes resoluciones de pantalla en computadoras de escritorio y tablets, manteniendo una experiencia de uso cómoda e intuitiva.

RNF3: El sistema deberá ofrecer tiempos de respuesta inferiores a 3 segundos para las operaciones más frecuentes, como consultas, creación de reclamos y cambios de estado, bajo condiciones normales de uso.

RNF4: La información estructurada deberá almacenarse en una base de datos MySQL, mientras que las fotografías y videos asociados a los reclamos deberán guardarse en un sistema de archivos organizado y seguro.

RNF5: La autenticación y autorización de usuarios deberá implementarse utilizando mecanismos seguros como JWT o Laravel Sanctum, garantizando el acceso únicamente a usuarios autorizados. 

RNF6: El sistema deberá cumplir con buenas prácticas de protección de datos personales, asegurando la confidencialidad, integridad y disponibilidad de la información de los ciudadanos. 

RNF7: Se deberán realizar copias de seguridad automáticas de forma diaria para minimizar el riesgo de pérdida de información y facilitar la recuperación ante incidentes técnicos. 

RNF8: La arquitectura del sistema deberá permitir su crecimiento futuro, soportando un aumento en la cantidad de usuarios, reclamos y archivos multimedia sin requerir una reestructuración completa.