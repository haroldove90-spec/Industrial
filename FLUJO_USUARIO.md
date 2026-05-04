# Propuesta Técnica: Flujo de Valor MetalFlow ERP

Este documento detalla el flujo de información y materiales en el prototipo **MetalFlow**, asegurando que cada etapa del proceso industrial esté blindada por datos, calidad y trazabilidad.

---

## 1. Entrada de Materia Prima y Registro de Compra
- **Acción:** Recepción de materiales (e.g., láminas de acero, perfiles).
- **Módulo:** *Compras / Inventario*.
- **Trazabilidad:** Se asigna un código de lote único a la entrada que hereda el certificado de origen del proveedor. Se actualiza el stock y se disparan alertas si el material llega a niveles críticos.

## 2. Generación de Orden de Trabajo (OT)
- **Acción:** Transformación del pedido del cliente en una hoja de ruta técnica.
- **Módulo:** *Ventas / Órdenes de Trabajo*.
- **Integridad:** La OT vincula el cliente, los planos técnicos y los materiales requeridos. El sistema valida si hay stock suficiente antes de liberar la orden a planta.

## 3. Ejecución en Planta e Indicadores de Eficiencia (OEE)
- **Acción:** El operario inicia sesión en una máquina y escanea la OT.
- **Módulo:** *Producción / Operarios / Maquinaria*.
- **Dato Crítico:** Monitoreo en tiempo real de:
    - **Disponibilidad:** ¿La máquina está operando o en mantenimiento?
    - **Rendimiento:** ¿Estamos produciendo a la velocidad nominal?
    - **Calidad:** Cantidad de piezas buenas vs. scrap.
- **Resultado:** Cálculo automático del **OEE (Overall Equipment Effectiveness)**.

## 4. Control de Calidad y Registro de No Conformidades
- **Acción:** Inspección dimensional y funcional durante y al final del proceso.
- **Módulo:** *Control de Calidad*.
- **Integridad:** Cada inspección se vincula al operario que produjo la pieza y a la máquina utilizada. Si se detecta una *No Conformidad*, se bloquea el lote para preventa y se inicia un proceso de re-trabajo o descarte.

## 5. Trazabilidad Total y Despacho
- **Acción:** Embalaje y envío al cliente.
- **Módulo:** *Trazabilidad / Logística*.
- **Cierre del Círculo:** El cliente recibe un producto con un "Pasaporte de Calidad" que permite rastrear, años después, quién lo soldó, en qué máquina se troqueló y qué lote de acero se utilizó.

---

**Propuesta de Valor:** MetalFlow no solo gestiona operaciones, sino que **transforma el ruido de la planta en datos accionables**, reduciendo desperdicios y elevando el estándar de cumplimiento del sector metalmecánico.
