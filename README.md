# README.md - AlquilerApp (Project Initialization Guide)

## 🚀 Resumen del Proyecto
**AlquilerApp** es una aplicación de gestión de alquileres diseñada con un enfoque **Mobile-First** y una arquitectura **Client-Server Desacoplada**. Su objetivo es centralizar la gestión de propiedades, contratos y gastos mensuales de manera segura y escalable.

## 🏗️ Arquitectura de Alto Nivel
El sistema opera mediante tres capas principales:
1.  **Frontend (React/UI):** Interfaz de usuario que consume el estado global y renderiza los componentes modulares.
2.  **State Management (React Context):** El `AuthContext` centraliza la sesión, el estado de carga y, crucialmente, el `rol` del usuario.
3.  **Backend (Firebase Cloud Functions):** Contiene la lógica de negocio crítica (transaccional) para garantizar la integridad de los datos (ej. validar transacciones de gasto o contrato).

## 🔑 Gestión de Usuarios y Roles (Seguridad)
La seguridad está ligada al sistema de roles definido en Firestore:
*   **Roles:** `ADMIN`, `ARRENDADOR`, `ARRENDATARIO`, `USUARIO_GENERAL`.
*   **Flujo de Login:** El login fuerza la sincronización del perfil contra Firestore mediante la función `obtenerPerfilUsuario`, asegurando que el rol siempre esté actualizado.
*   **Control de Acceso:** El `Dashboard.jsx` utiliza el rol del contexto para mostrar u ocultar secciones enteras de la aplicación.

## ⚙️ Pasos de Configuración y Despliegue (Deployment Checklist)

### Fase 1: Configuración de Entorno Local
1.  **Dependencias:** Instalar todas las librerías necesarias (Firebase SDKs, React Router, etc.).
2.  **Contexto:** Asegurarse de que `AuthProvider` envuelva todo el componente `<App />`.
3.  **Manejo de Estado:** El `useAuth()` debe ser el primer punto de acceso a cualquier dato sensible.

### Fase 2: Backend (Cloud Functions)
1.  **Implementación:** Desplegar las funciones: `registrarGasto` y `crearContratoDeAlquiler`.
2.  **Sincronización:** Desplegar `obtenerPerfilUsuario` para asegurar que el *login* inicial siempre valide y establezca el perfil de usuario.

### Fase 3: Frontend (UI/UX)
1.  **Login:** Implementar `LoginForm.jsx` para asegurar que el `login()` del contexto es llamado correctamente.
2.  **Dashboard:** Revisar y completar los *handlers* de navegación y los *guards* de renderizado en `Dashboard.jsx` basados en el `role`.

---
**Documentos Clave de Referencia:**
*   **Contexto Maestro:** `src/context/AuthContext.jsx`
*   **Lógica de Estado:** `src/components/LoginForm.jsx`
*   **Router Principal:** `src/components/Dashboard.jsx`
*   **Lógica Backend:** `Cloud Functions` (Firebase Console)

**STATUS:** **Diseño y Arquitectura Completados.** Listo para la fase de implementación *full-stack*.