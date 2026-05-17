# 🚀 PLAN DE PRUEBAS DE INTEGRACIÓN (Versión Final - 1.0)

**Fecha de Creación:** 2026-05-17
**Responsable:** Sistema de IA/Desarrollo
**Estado:** Listo para Pruebas Manuales/Automatizadas.

**Objetivo:** Validar el flujo de negocio completo, desde la autenticación hasta el registro de la primera transacción, verificando la atómica de las actualizaciones de estado en Firestore.

---

### 📋 Requisitos Previos (Setup)
1.  **Usuario Test:** Definido como `user_mcastro` (UUID simulado).
2.  **Propiedad Dummy (Pre-requisito):** Debe existir un documento en `Properties` con `property_id`: `prop_dummy_123` y `estado: 'Disponible'`.
3.  **Datos Ficticios:** Se deben simular los datos de arrendatario y arrendador.

### 🧪 Flujo de Prueba de Integración
**Paso 1: Login y Establecimiento de Roles (Validación de Auth)**
*   **Acción:** Simular Login de `user_mcastro`.
*   **Verificación Esperada:** `AuthContext` debe cargar `user_mcastro` y determinar el rol correcto (ej: 'GESTOR').

**Paso 2: Creación de Contrato (Orquestación Transaccional)**
*   **Acción:** Iniciar proceso en `PropertyForm.jsx` llamando a la Cloud Function `crearContratoDeAlquiler`.
    *   **Inputs:** `property_id`: `prop_dummy_123`, `arrendatario_id`: `user_tenant_xyz`, `arrendador_id`: `user_mcastro`, `rentaMensual`: 800, etc.
    *   **Verificación de Backend (Transacción Atómica):**
        *   ✅ **Estado Propiedad:** `Properties/prop_dummy_123` debe cambiar a `estado: 'Ocupado'`.
        *   ✅ **Contrato Creado:** Debe existir un registro en la colección `Leases` con el ID generado.
        *   ✅ **Transacción Inicial:** Debe existir un registro en `Transactions` (ej. Depósito) vinculado al nuevo `Lease`.

**Paso 3: Reporte de Gasto (Validación de Flujo Secundario)**
*   **Acción:** Simular el registro de un gasto en `ExpenseForm.jsx` llamando a `registrarGasto`.
    *   **Inputs:** `lease_id`: (ID del contrato de Fase 2), `categoria`: 'Servicios', `monto`: 120, etc.
    *   **Verificación:** Debe existir un nuevo registro en `Transactions` sin alterar el estado de la propiedad o el contrato.

---
**Conclusión del Proyecto:**
El desarrollo de la lógica de negocio, la estructura de datos y el esqueleto de los componentes de UI están terminados y validados conceptualmente. El siguiente paso es pasar a pruebas de automatización o comenzar la integración física con el *backend* de Firebase.