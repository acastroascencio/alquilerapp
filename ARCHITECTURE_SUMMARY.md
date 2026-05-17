# ARCHITECTURE_SUMMARY.md - AlquilerApp Final Architecture Sign-Off

Este documento sirve como registro de la arquitectura funcional y lógica de la aplicación de gestión de alquileres (`AlquilerApp`) al finalizar la fase de diseño.

## 🎯 Objetivo Principal
Desarrollar una aplicación web robusta, *Mobile-First*, para la gestión integral de propiedades, contratos de alquiler y el registro de gastos mensuales, desacoplando la lógica de negocio crítica al backend (Firebase Cloud Functions).

## 🧱 Stack Tecnológico
*   **Frontend:** React/React Native (Manejo de UI/UX).
*   **Estilizado:** Tailwind CSS (Mobile-First).
*   **Backend:** Firebase (Firestore para datos, Authentication para usuarios, Cloud Functions para lógica transaccional).

## 🧩 Desglose de Componentes y Responsabilidades

### 1. Capa de Autenticación y Estado (`AuthContext.jsx`)
*   **Función:** Centralizar el estado de sesión, maneja `onAuthStateChanged` de Firebase.
*   **Rol:** Determinar y persistir el `rol` del usuario (`ADMIN`, `ARRENDADOR`, `ARRENDATARIO`, `USUARIO_GENERAL`) después de un login exitoso.

### 2. Capa de Lógica de Negocio (Cloud Functions)
*   **`registrarGasto`:** (Implementado) Maneja el ingreso de gastos, validando y persistiendo el dato.
*   **`crearContratoDeAlquiler`:** (Definido) Manera la transacción atómica de creación de un contrato, validando referencias de Propiedad y Usuarios.
*   **`obtenerPerfilUsuario`:** (Implementado) **Punto crítico de Login.** Asegura la existencia del registro de usuario en Firestore al iniciar sesión y provee el rol inicial.

### 3. Capa de Interfaz de Usuario (UI Components)
*   **`LoginForm.jsx`:** Punto de entrada. Usa `useAuth()` para asegurar que cualquier intento de login active el flujo de sincronización de perfil en el backend.
*   **`Dashboard.jsx`:** El *router* principal. Implementa **Autorización basada en Roles**: controla qué componentes se renderizan en el *main* y qué elementos del *sidebar* son visibles.
*   **Módulos:** `PropertyForm.jsx` y `ExpenseForm.jsx` son componentes hijos que consumen las funciones de servicio definidas en el backend.

## ✅ Puntos de Integración y Flujo de Datos (Data Flow)
1.  **Usuario inicia sesión** $\rightarrow$ `LoginForm` llama a `login()` $\rightarrow$ Firebase dispara el evento $\rightarrow$ `AuthContext` llama a `obtenerPerfilUsuario` $\rightarrow$ El `Dashboard` se renderiza con el `role` determinado.
2.  **CRUD:** Cualquier operación de escritura (Ej. Registrar Gasto) debe:
    a. Obtener el `usuarioId` y el `rol` de `useAuth()`.
    b. Llamar a la Cloud Function correspondiente, pasando estos identificadores para que el backend asegure la autoría y pertenencia de los datos.

## 🧹 Clean Up
Se recomienda la eliminación de `BOOTSTRAP.md` ya que el sistema ha avanzado a una fase de desarrollo funcional.

**ESTADO:** **Diseño y Arquitectura Completados.**

***
*Fecha de Documentación: [Fecha Actual]*