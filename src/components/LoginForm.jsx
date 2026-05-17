# ARQUIVO: src/components/ExpenseForm.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; 

const ExpenseForm = () => {
    const { user } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // *** LÓGICA A IMPLEMENTAR ***
        // 1. Recoger datos del formulario.
        // 2. Llamar a la Cloud Function 'registrarGasto' pasando {amount, description, propiedadId}.
        // 3. Si es exitoso, actualizar localmente el estado de gastos y el totalGastos del usuario.
        alert('Simulación: Se llamaría a Cloud Function "registrarGasto" con usuario: ' + (user?.email || 'N/A'));
    };

    return (
        <div className="p-4 border border-green-300 rounded-lg shadow-md bg-green-50">
            <h4 className="text-xl font-semibold mb-3 text-green-800">Registro de Gastos</h4>
            <p className="text-sm text-gray-600 mb-4">Útil para registrar gastos de mantenimiento y operación.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto del Gasto ($)</label>
                    <input type="number" id="amount" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input type="text" id="description" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition">
                    Guardar Gasto
                </button>
            </form>
        </div>
    );
}

export default ExpenseForm;
\`\`\`
# ARCHIVO: src/components/PropertyForm.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; 

const PropertyForm = () => {
    const { user } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // *** LÓGICA A IMPLEMENTAR ***
        // 1. Recoger datos del formulario.
        // 2. Llamar a la Cloud Function 'crearContratoDeAlquiler' pasando {propiedades, usuarioId, etc.}.
        // 3. Al éxito, actualizar los contratosActivos del usuario en Firestore.
        alert('Simulación: Se llamaría a Cloud Function "crearContratoDeAlquiler" con usuario: ' + (user?.email || 'N/A'));
    };

    return (
        <div className="p-4 border border-indigo-300 rounded-lg shadow-md bg-indigo-50">
            <h4 className="text-xl font-semibold mb-3 text-indigo-800">Gestión de Propiedades y Contratos</h4>
            <p className="text-sm text-gray-600 mb-4">Define la propiedad y estructura el contrato asociándolo a un usuario.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="propiedadId" className="block text-sm font-medium text-gray-700">ID/Dirección Propiedad</label>
                    <input type="text" id="propiedadId" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio de Contrato</label>
                    <input type="date" id="fechaInicio" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                </div>
                <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition">
                    Registrar Contrato
                </button>
            </form>
        </div>
    );
}

export default PropertyForm;
\`\`\`
# ARCHIVO: src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const LoginForm = () => {
    const { login, loading, error } = useAuth(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Esto dispara la lógica de Firebase Auth y la sincronización de perfil.
        } catch (e) {
            console.error("Error de Login:", e);
        }
    };

    return (
        <div className="p-8 bg-white shadow-2xl rounded-xl max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-indigo-800">Inicia Sesión</h2>
            <p className="mb-8 text-gray-500">Acceso al Sistema de Gestión de Alquileres.</p>
            
            <form onSubmit={handleLogin} className="space-y-5">
                {/* Campos de Email y Password */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="tu@empresa.com"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="********"
                    />
                </div>

                {/* Botón de Acción */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                            Ingresando...
                        </div >
                    ) : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;