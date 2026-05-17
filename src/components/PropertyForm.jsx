# COMPONENTE REACT: Formulario de Propiedad (PropertyForm)

Este componente debe ser el encargado de capturar todos los datos de la propiedad y de orquestar la creación del contrato en el backend, llamando a `crearContratoDeAlquiler`.

## 🧩 Estructura Técnica y Tecnologías
*   **Framework:** React (Hooks).
*   **Estilizado:** Tailwind CSS.
*   **Comunicación:** Necesita interactuar con dos servicios de Firebase:
    1.  **Firestore:** Para buscar la propiedad por `propiedadId` (Leer).
    2.  **Cloud Functions:** Para llamar a `crearContratoDeAlquiler` (Escribir).

## 📝 Flujo de Trabajo y Lógica de Componente
El flujo debe ser secuencial y dependiente:
1.  **Paso 1: Consulta de Datos:** El usuario debe ingresar manualmente o seleccionar la `Propiedad` existente para obtener su `propiedad_id`.
2.  **Paso 2: Captura de Datos de Contrato:** El usuario ingresa los datos contractuales (`rentaMensual`, `arrendatarioId`, `arrendadorId`, fechas).
3.  **Paso 3: Orquestación de la Creación:** Al hacer clic en "Crear Contrato", se ejecuta la llamada al Cloud Function.

**Componente:** `PropertyForm.jsx`

\`\`\`jsx
import React, { useState, useCallback } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function PropertyForm() {
    // ESTADO PRINCIPAL
    const [formData, setFormData] = useState({
        propiedadId: '', // Se debe obtener o seleccionarse de un lookup.
        arrendatarioId: '',
        arrendadorId: '',
        rentaMensual: '',
        deposito: '',
        fechaInicio: '',
        fechaFinEstimada: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const functions = getFunctions();

    // 1. Lógica de Consulta de Propiedad (Simulación de lookup)
    const handleLoadProperty = useCallback(async (propiedadId) => {
        // En una app real, esto consultaría la propiedad y llenaría los datos base.
        setMessage({ type: '', text: '' });
        setFormData(prev => ({ ...prev, propiedadId: propiedadId }));
        console.log("Propiedad cargada con ID:", propiedadId);
    }, []);

    // 2. Manejador de Cambios (Simplificado)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage({ type: '', text: '' });
    };

    // 3. Lógica de Envío (Llamada al Backend)
    const handleCreateContract = useCallback(async (e) => {
        e.preventDefault();
        if (isLoading) return;

        // Validación Básica en Cliente
        if (!formData.propiedadId || !formData.arrendatarioId || !formData.arrendadorId || !formData.rentaMensual || !formData.fechaInicio || !formData.fechaFinEstimada) {
            setMessage({ type: 'error', text: 'Por favor, complete todos los campos obligatorios.' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // 1. Llamar a la Cloud Function
            const crearContrato = httpsCallable(functions, 'crearContratoDeAlquiler');
            
            const dataToSend = {
                propiedadId: formData.propiedadId,
                arrendatarioId: formData.arrendatarioId,
                arrendadorId: formData.arrendadorId,
                rentaMensual: parseFloat(formData.rentaMensual),
                fechaInicio: formData.fechaInicio,
                fechaFinEstimada: formData.fechaFinEstimada,
                // Se asume que el depósito se puede obtener del lookup de propiedad o pasarse por separado
                deposito: parseFloat(formData.deposito) || 0
            };

            await crearContrato(dataToSend);
            
            // Éxito
            setMessage({ type: 'success', text: '✅ Contrato creado exitosamente. Estado actualizado en el backend.' });
            // Resetear formulario o navegar.
            
        } catch (error) {
            // Manejo de errores del backend
            const errorMessage = error.message || 'Error al intentar crear el contrato. Verifique los roles o la existencia de la propiedad.';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setIsLoading(false);
        }
    }, [formData]);

    // 4. Renderizado del Componente
    return (
        <div className="p-6 bg-white shadow-xl rounded-xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Creación de Contrato de Alquiler</h2>

            {/* Renderizar el formulario... */}
            <form onSubmit={handleCreateContract} className="space-y-6">
                {/* Sección 1: Propiedad (Selección) */}
                <div>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-3 text-indigo-700">1. Propiedad</h3>
                    {/* Aquí iría un <select> que haga llamadas a Firestore para cargar propiedades disponibles. */}
                    {/* Ejemplo de uso: <button onClick={() => handleLoadProperty('UUID_DE_PROPIEDAD')} disabled={isLoading}>Cargar Propiedad</button> */}
                    <div className="p-3 border border-gray-200 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Propiedad ID: {formData.propiedadId || 'Pendiente de selección'}</p>
                    </div>
                </div>

                {/* Sección 2: Datos Contractuales */}
                <div>
                    <h3 className="text-xl font-bold border-b pb-2 mb-4 text-indigo-700">2. Detalle Contractual</h3>
                    {/* Campos de entrada: PropiedadID, ArrendatarioID, ArrendadorID, Renta, Fechas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Campos de Usuario: Arrendatario/Arrendador (Deberían ser selectores de usuarios existentes en Firestore) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Arrendatario ID</label>
                            <input type="text" name="arrendatarioId" value={formData.arrendatarioId} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        {/* ... Otros campos de usuario... */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Renta Mensual ($) *</label>
                            <input type="number" name="rentaMensual" value={formData.rentaMensual} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        
                        {/* Fechas */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio *</label>
                            <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin Estimada *</label>
                            <input type="date" name="fechaFinEstimada" value={formData.fechaFinEstimada} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Botón de Acción */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                            Creando Contrato...
                        </div >
                    ) : 'Generar Contrato y Actualizar Estado'}
                </button>
            </form>
        </div>
    );
}

export default PropertyForm;