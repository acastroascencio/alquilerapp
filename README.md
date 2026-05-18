# 🏠 AlquilerApp - Sistema de Gestión Inmobiliaria

**Versión:** 1.0.0 (MVP)
**Estado:** ¡Funcional! Listo para Pruebas de Integración y Despliegue (Vercel).

---

## 🚀 Resumen del Proyecto
AlquilerApp es una aplicación web completa diseñada para gestionar el ciclo de vida completo de las propiedades de alquiler. Centraliza la gestión de datos maestros, contratos, y transacciones financieras, garantizando la integridad de la información en cada paso.

## ⚙️ Arquitectura Técnica
*   **Frontend:** React (React Hooks/Vite) consumiendo el *Single Page Application (SPA)* cargado vía `index.html`.
*   **Backend (Lógica de Negocio):** Basado en Cloud Functions (Firebase) para garantizar transacciones atómicas.
*   **Persistencia:** Firestore (Base de datos NoSQL).

## ✨ Funcionalidades Implementadas (MVP Core)

1.  **Gestión de Usuarios:** Sistema de *login* que define roles (Admin, Gestor, Arrendatario) mediante `AuthContext`.
2.  **Dashboard (`PropertyList`):** Vista central que muestra en tiempo real todas las propiedades asignadas al usuario logueado.
3.  **Creación de Contrato (`PropertyForm`):** Un flujo transaccional que:
    *   Marca la propiedad como **'Ocupada'**.
    *   Crea el registro de contrato (`Leases`).
    *   Registra la primera transacción financiera (Ej: Depósito).
4.  **Gestión de Gastos (`ExpenseForm`):** Permite registrar gastos operativos, obligando al usuario a vincular el gasto a un contrato activo (`Leases`).

## 📚 Documentación de Referencia
*   **Esquema de Datos:** `MODELO_PROPIEDAD.md`
*   **Flujo de Trabajo:** `USER_MANUAL.md`
*   **Pruebas:** `TEST_PLAN.md`

## 🚀 Pasos para el Despliegue (Vercel)
1.  **Dependencias:** Ejecutar `npm install` para instalar `react`, `react-dom`, y las librerías de Firebase.
2.  **Build:** Ejecutar `npm run build` para generar los archivos estáticos en el directorio `dist/`.
3.  **Configuración:** Asegurarse de que `vercel.json` apunte correctamente a este proceso.

---
**Estado:** **Listo para Producción (QA/UAT).**
**Próxima Acción:** Ejecutar las pruebas descritas en `TEST_PLAN.md` en un entorno de staging.
