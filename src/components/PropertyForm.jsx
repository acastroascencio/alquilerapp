import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PropertyForm() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({ address: '', rent: '', propertyId: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Por favor, inicie sesión para realizar esta acción.");
            return;
        }

        // --- SIMULACIÓN DE BACKEND/FIREBASE ---
        console.log("Intentando registrar propiedad para:", user.email);
        
        alert(`Propiedad ${formData.address} procesada con éxito. (Lógica de backend simulada)`);
        navigate('/');
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl border border-indigo-100">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">Registrar Nueva Propiedad</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Calle Ficticia, Número"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="rent" className="block text-sm font-medium text-gray-700 mb-1">Renta Mensual ($)</label>
                    <input
                        type="number"
                        name="rent"
                        id="rent"
                        value={formData.rent}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Monto mensual"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1">ID de Referencia (Opcional)</label>
                    <input
                        type="text"
                        name="propertyId"
                        id="propertyId"
                        value={formData.propertyId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ej: PR-2024-001"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                    Guardar Propiedad
                </button>
            </form>
        </div >
    );
}

export default PropertyForm;