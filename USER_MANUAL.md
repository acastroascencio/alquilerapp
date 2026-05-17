# 🧑‍🏠 Manual de Usuario - AlquilerApp (Versión 1.0)

**Audiencia:** Administradores de Propiedades y Gestores de Inmuebles.
**Propósito:** Guiar al usuario paso a paso para gestionar el ciclo de vida de una propiedad, desde su listado hasta el registro de pagos y gastos.

---

## 🟢 Paso 1: Acceso y Verificación de Roles

1.  **Login:** Acceda a la aplicación con sus credenciales.
2.  **Verificación de Permisos:** El sistema confirmará automáticamente su rol (Ej: Gestor, Administrador). Solo los roles con permisos de gestión podrán realizar cambios en el estado de la propiedad.

## 🏘️ Paso 2: Dashboard (Listado de Propiedades)
Al entrar, verá una lista de todas las propiedades bajo su gestión.
*   **Estado:** Verifique el estado (`Disponible`, `Ocupado`, `Mantenimiento`) para identificar oportunidades de negocio.

## 🔑 Paso 3: Creación de Contrato (El Ciclo de Vida Principal)

Este proceso debe realizarse siempre que una propiedad pase de 'Disponible' a 'Ocupado'.

1.  **Seleccionar Propiedad:** En el dashboard, haga clic en "Gestionar Contrato" para la propiedad deseada.
2.  **Llenar Datos:** Complete los detalles del arrendatario, arrendador y los términos contractuales (Renta, Depósito).
3.  **Confirmar:** Haga clic en "Generar Contrato y Actualizar Estado".
    *   **Resultado:** El sistema: 
        *   Establece el estado de la propiedad a **'Ocupado'**.
        *   Crea el contrato en la base de datos.
        *   Registra automáticamente la primera transacción (el depósito o el pago inicial).

## 💵 Paso 4: Gestión de Transacciones y Gastos

Cuando ocurre un evento financiero (ej. pago de luz, mantenimiento, pago de renta):

1.  **Navegar:** Desde la vista del contrato o desde la vista principal, acceda a "Registrar Gasto".
2.  **Vincular:** **🚨 ¡Paso Crítico!** Seleccione el `Contrato de Alquiler` activo al que pertenece el gasto.
3.  **Detalles:** Ingrese la fecha, la categoría (`Servicios`, `Mantenimiento`, etc.), y el monto exacto.
4.  **Confirmar:** Haga clic en "Guardar Gasto".
    *   **Resultado:** El gasto queda registrado, y el sistema notifica automáticamente al arrendador/arrendatario (si el sistema de notificación está activo).

---
**✅ Nota Importante:**
Este manual cubre la funcionalidad central. Cualquier variación en el proceso (ej. renovación de contratos, manejo de pagos atrasados, revisiones legales) debe ser tratada como una **funcionalidad de Fase 2** y debe ser documentada en el módulo de `TEST_PLAN.md` antes de ser desarrollada.