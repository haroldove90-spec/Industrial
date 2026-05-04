# Escalamiento del Prototipo Industrial Control

Este prototipo ha sido diseñado con una arquitectura modular pensando en la escalabilidad inmediata a un entorno de producción real. A continuación, se detallan los pasos técnicos necesarios para migrar de este mockup funcional a una aplicación empresarial robusta.

## 1. Migración de Framework (Next.js)

Para soportar SEO, mayor rendimiento y una estructura de carpetas más robusta:
- **Directorio `app/`**: Migrar los componentes del prototipo a la estructura de App Router de Next.js.
- **Server Components**: Utilizar componentes de servidor para las consultas pesadas a la base de datos (Reportes, Inventario) y componentes de cliente para las interfaces interactivas (Check-in QR, Visor de Planos).

## 2. Implementación de Backend (Supabase)

El prototipo simula la lógica de datos que debería residir en Supabase:
- **Base de Datos (PostgreSQL)**: Crear las tablas según el esquema definido en el prototipo (`production`, `inventory`, `non_conformities`, `maintenance_logs`).
- **Autenticación (Auth)**: Utilizar Supabase Auth para manejar el inicio de sesión real. El `currentRole` del prototipo se mapearía a los `custom_claims` de los usuarios en Supabase.
- **Realtime**: Implementar suscripciones en tiempo real para el Dashboard de OEE y el flujo de trazabilidad, permitiendo que la planta vea los cambios sin refrescar la página.

## 3. Seguridad de Datos (RBAC & RLS)

En producción, la ocultación visual de módulos no es suficiente:
- **Row Level Security (RLS)**: Configurar políticas en PostgreSQL para que, por ejemplo, un 'Operador' no pueda si quiera consultar (vía API) los datos de la tabla `reports` o los costos en `non_conformities`.
- **Middlewares**: Implementar un middleware de Next.js que verifique el rol del usuario antes de permitir la entrada a rutas críticas como `/admin`.

## 4. Hardware e Integración de Borde

- **IoT Hub**: Conectar los PLCs de las máquinas (CNC, Tornos) a un hub de IoT que envíe datos directamente a la tabla `production_logs`.
- **PWA**: Convertir la aplicación en una Progressive Web App para permitir el uso del escáner QR y la carga de fotos de evidencia incluso en zonas del taller con baja conectividad.

---
**Versión de Prototipo 1.0**
Desarrollado para validación de procesos industriales y flujos de trabajo de calidad.
