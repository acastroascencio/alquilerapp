# COMPONENTE REACT: Formulario de Gasto Mensual (ExpenseForm)

Este componente debe ser el punto de contacto principal para el usuario en el *frontend* y debe seguir la reactividad y el diseño *Mobile-First*.

## 🧩 Estructura Técnica y Tecnologías
*   **Framework:** React (con Hooks: `useState`, `useEffect`, `useContext`).
*   **Estilizado:** Tailwind CSS.
*   **Comunicación:** Uso de `firebase/functions` para llamar al *endpoint* `registrarGasto`.

## 🧩 Estado del Componente (React State)
*   `formData`: Objeto que almacena los valores temporales del gasto.
*   `isLoading`: Booleano para mostrar *spinner* y deshabilitar botones durante la llamada al *backend*.
*   `isSuccess`: Booleano para mostrar mensajes de éxito y hacer visible el mensaje de confirmación.
*   `error`: Mensaje de error recibido de Firebase.

## 📝 Lógica del Componente (Pseudo-código de React)

\`\`\`jsx
import React, { useState, useCallback } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';

function ExpenseForm() {
    // 1. Inicialización de hooks y servicios
    const [formData, setFormData] = useState({
        usuarioId: /* Obtenido del contexto de Auth */, 
        categoria: '', 
        monto: '', 
        descripcion: '', 
        fechaGasto: new Date().toISOString().split('T')[0]
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const functions = getFunctions();

    // 2. Manejador de Cambios de Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage({ type: '', text: '' }); // Limpiar mensajes al interactuar
    };

    // 3. Función de Envío (Llamada al Backend)
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (isLoading) return;

        // 1. Validación Frontend (Client-Side)
        if (!formData.categoria || !formData.monto || !formData.fechaGasto) {
            setMessage({ type: 'error', text: 'Por favor, complete al menos Categoría, Monto y Fecha.' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // 2. Llamada a la Cloud Function de Firebase
            const registrarGasto = httpsCallable(functions, 'registrarGasto');
            
            // Preparamos los datos para el backend
            const dataToSend = {
                usuarioId: formData.usuarioId,
                categoria: formData.categoria,
                monto: parseFloat(formData.monto),
                descripcion: formData.descripcion,
                fechaGasto: new Date(formData.fechaGasto) // Debe ser un objeto Date válido
            };

            await registrarGasto(dataToSend);
            
            // Éxito
            setMessage({ type: 'success', text: '✅ Gasto registrado exitosamente.' });
            // Limpiar formulario o navegar:
            setFormData({ usuarioId: formData.usuarioId, categoria: '', monto: '', descripcion: '', fechaGasto: new Date().toISOString().split('T')[0] });

        } catch (error) {
            // Manejo de errores del backend (Firestore/Firebase)
            const errorMessage = error.code === 'invalid-argument' 
                ? error.message : `Error de Backend: ${error.message || 'Intente nuevamente.'}`;
            
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setIsLoading(false);
        }
    }, [formData.usuarioId]); // Dependencia: el usuario cambia el comportamiento.

    // 4. Renderizado del Componente
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-indigo-700 border-b pb-2">Registrar Gasto Mensual</h2>

            {/* Mensajes de Feedback */}
            {message.text && (
                <div className={`p-3 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Campo de Fecha (Obligatorio) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del Gasto *</label>
                    <input 
                        type="date" 
                        name="fechaGasto" 
                        value={formData.fechaGasto} 
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Campo de Categoría (Obligatorio) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                    <select 
                        name="categoria" 
                        value={formData.categoria} 
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        required
                    >
                        <option value="" disabled>Seleccione la categoría</option>
                        <option value="Servicios">Servicios (Ej: Luz, Agua)</option>
                        <option value="Mantenimiento">Mantenimiento (Ej: Reparaciones)</option>
                        <option value="Servicios Personales">Servicios Personales</option>
                    </select>
                </div>
                
                {/* Campo de Monto (Obligatorio) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total ($) *</label>
                    <input 
                        type="number" 
                        name="monto" 
                        value={formData.monto} 
                        onChange={handleChange}
                        placeholder="Ej: 150.00"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Campo de Descripción (Opcional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (Opcional)</label>
                    <textarea 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleChange}
                        rows="3"
                        placeholder="Detalle del gasto (ej: Pago de electricidad de Mayo)."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    ></textarea>
                </div>

                {/* Botón de Acción */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                            Guardando...
                        </div>
                    ) : 'Guardar Gasto Mensual'}
                </button>
            </form>
        </div>
    );
}

export default ExpenseForm;