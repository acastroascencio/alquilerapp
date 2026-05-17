// src/utils/test-utils.js
/**
 * =============================================================================
 * UTILITIES DE MOCKING PARA PRUEBAS DE INTEGRACIÓN
 * =============================================================================
 *
 * Este módulo contiene funciones mock que simulan la conexión con Firebase/Firestore
 * y las llamadas a Cloud Functions. Es crucial para las pruebas unitarias y de integración
 * sin necesidad de una conexión activa a la infraestructura de backend.
 * =============================================================================
 */

// Mock para Firebase/Firestore
export const mockFirestore = {
    // Simula la obtención de datos de la colección de Propiedades
    fetchProperties: async (query) => {
        console.log("[MOCK FIRESTORE] Simulando lectura de propiedades para la consulta:", JSON.stringify(query));
        // Retorna un array simulado de propiedades
        return [
            { id: "prop_dummy_123", propiedad_id: "prop_dummy_123", direccion: "Calle Ficticia 101", ciudad: "Ciudad Capital", metrosCuadrados: 120, numeroHabitaciones: 3, numeroBaños: 2, tipo: "Apartamento", estado: "Disponible", ultimaActualizacion: new Date().toISOString(), arrendadorId: "user_mcastro" },
            { id: "prop_dummy_456", propiedad_id: "prop_dummy_456", direccion: "Avenida Siempreviva 742", ciudad: "Ciudad Capital", metrosCuadrados: 80, numeroHabitaciones: 1, numeroBaños: 1, tipo: "Apartamento", estado: "Ocupado", ultimaActualizacion: new Date().toISOString(), arrendadorId: "user_mcastro" }
        ];
    },
    // Mock para actualizar el estado de la propiedad
    updatePropertyState: async (propertyId, newState) => {
        console.log(`[MOCK FIRESTORE] Actualizando propiedad ${propertyId} a estado: ${newState}`);
        return { success: true, newStatus: newState };
    },
    // Mock para crear un nuevo documento
    createDocument: async (collection, data) => {
        console.log(`[MOCK FIRESTORE] Creando documento en ${collection} con datos:`, data);
        // Retorna un ID simulado
        return { success: true, newId: `id_generado_${Math.random().toString(36).substring(2, 9)}` };
    }
};

// Mock para Cloud Functions
export const mockFunctions = {
    /**
     * Simula la llamada a la Cloud Function 'crearContratoDeAlquiler'.
     * Debe ejecutar la lógica transaccional en orden.
     */
    crearContratoDeAlquiler: async (data) => {
        console.log("\n--- LLAMANDO FUNCION: crearContratoDeAlquiler ---");
        
        // PASO 1: CREAR CONTRATO
        const leaseId = await mockFirestore.createDocument("Leases", { 
            lease_id: `lease_${Date.now()}`, 
            ...data, 
            estado: "ACTIVO" 
        });
        
        // PASO 2: ACTUALIZAR ESTADO DE PROPIEDAD
        await mockFirestore.updatePropertyState(data.propiedadId, "Ocupado");
        
        // PASO 3: CREAR TRANSACCIÓN INICIAL (Depósito)
        await mockFirestore.createDocument("Transactions", { 
            lease_id: leaseId.newId, 
            tipo: 'Pago Inicial', 
            monto: data.deposito || 0, 
            descripcion: 'Depósito y Primer Mes de Renta', 
            fecha: new Date().toISOString()
        });
        
        return { success: true, leaseId: leaseId.newId };
    },

    /**
     * Simula la lógica de notificaciones al completar una transacción.
     * Esta función sería llamada por el backend.
     */
    dispararNotificacion: async (eventData) => {
        console.log(`[MOCK NOTIFICACIÓN] 🔔 Enviando notificación al arrendador: ${eventData.mensaje}`);
        // En un entorno real, aquí se llamaría a un servicio de SMS/Email/Firebase Messaging.
        return { success: true };
    },
    
    /**
     * Función que debería usarse en el backend para asegurar que el gasto notifique.
     */
    registrarGasto: async (data) => {
        console.log("\n--- LLAMANDO FUNCION: registrarGasto ---");
        
        // 1. Crear transacción
        await mockFirestore.createDocument("Transactions", { 
            lease_id: data.leaseId, // El módulo de gasto debe saber el lease_id
            tipo: 'Gasto Operacional', 
            monto: data.monto, 
            descripcion: data.descripcion, 
            fecha: data.fechaGasto 
        });
        
        // 2. Disparar Notificación
        await mockFunctions.dispararNotificacion({ 
            mensaje: `Se ha reportado un gasto de $${data.monto} en la propiedad.`,
            usuarioId: data.usuarioId
        });
        
        return { success: true };
    }
};
