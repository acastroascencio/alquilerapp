# SCHEMA: Usuario (User Schema)
*   **ID Único:** UUID (Correspondiente al UID de Firebase Auth)
*   **Datos Personales:**
    *   `nombre`: String (Obligatorio)
    *   `email`: String (Único, proveedor de Firebase Auth).
    *   `telefono`: String (Opcional).
*   **Roles de Sistema:**
    *   `rol`: String (Enumerado: `ADMIN`, `ARRENDADOR`, `ARRENDATARIO`, `ADMIN_FACILITADOR`). (Obligatorio)
    *   `estado_activo`: Boolean (Obligatorio)
*   **Resúmenes de Actividad:**
    *   `totalGastos`: Number (Decimal). Mantenido por la Cloud Function `registrarGasto`.
    *   `contratosActivos`: Array de UUIDs (Referencias a `contratos`).
    *   `ultima_conexion`: Timestamp (Para tracking).

# Flujo de Autenticación y Roles
El flujo de login es el guardián de la aplicación y debe ser robusto para determinar qué vista mostrar.

1.  **Inicio de Sesión:** El usuario ingresa credenciales $\rightarrow$ Firebase Auth valida las credenciales.
2.  **Validación de Rol:** Tras un login exitoso, el *frontend* debe llamar a un endpoint de la Cloud Function (`obtenerPerfilUsuario`) que:
    *   Busca el usuario en la colección `usuarios` usando el `uid` de Firebase Auth.
    *   **Acción:** Si el perfil no existe, debe llamar a una función que fuerce la creación del registro en `usuarios` con el rol por defecto (`USUARIO_GENERAL`).
3.  **Direccionamiento (Frontend):** Basado en el `rol` obtenido de `usuarios.rol`, el `Dashboard.jsx` debe:
    *   Si **ADMIN**: Mostrar acceso completo a todo.
    *   Si **ARRENDADOR/ARRENDATARIO**: Solo verán la pestaña correspondiente y las acciones de administración de contratos estarán restringidas por la lógica del *backend*.

## 🚧 Módulos Pendientes de Integración
1.  **Módulo de Usuarios:** Creación de la interfaz de administración de usuarios (Solo visible para ADMIN).
2.  **Lógica de Dashboard:** Integrar el *guard* de rutas basado en el rol obtenido del login.
