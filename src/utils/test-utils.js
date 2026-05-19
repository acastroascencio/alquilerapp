// ===============================================
// UTILS: Funciones de utilidad para el proceso de testing.
// No debe contener comentarios con '#' ni sintaxis JSX.
// ===============================================

/**
 * Simula la función de obtener datos de un contrato específico.
 * @param {string} leaseId - ID del contrato.
 * @returns {Promise<object|null>} Datos del contrato o null si no existe.
 */
export const fetchContractDetails = async (leaseId) => {
    console.log(`Simulando fetch de detalles para Lease ID: ${leaseId}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simula latencia de API
    
    if (leaseId.startsWith('L-')) {
        return {
            leaseId: leaseId,
            propertyId: 'PR-2024-001',
            propertyAddress: "Avenida Central 123",
            startDate: "2024-01-01",
            endDate: "2025-01-01",
            status: "Activo"
        };
    }
    return null;
};

/**
 * Simula la función para verificar si el usuario tiene el rol de Gestor.
 * @param {string} role - El rol a verificar.
 * @returns {boolean} True si el rol es válido.
 */
export const checkUserRole = (role) => {
    const validRoles = ['ADMIN', 'GESTOR', 'ARRENDATARIO'];
    return validRoles.includes(role);
};