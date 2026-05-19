import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ExpenseForm() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [expense, setExpense] = useState({ description: '', amount: '', propertyId: '', leaseId: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Por favor, inicie sesión para registrar gastos.");
            return;
        }

        // --- SIMULACIÓN DE BACKEND/FIREBASE ---
        console.log("Intentando registrar gasto para:", user.email);
        
        alert(`Gasto de $${expense.amount} registrado para el Contrato ${expense.leaseId}. (Lógica de backend simulada)`);
        navigate('/');
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl border border-indigo-100">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">Reportar Gasto Operativo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción del Gasto</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={expense.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ej: Reparación de tuberías"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Monto total del gasto"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="leaseId" className="block text-sm font-medium text-gray-700 mb-1">Contrato Asociado (Lease ID)</label>
                    <input
                        type="text"
                        name="leaseId"
                        id="leaseId"
                        value={expense.leaseId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ej: L-12345"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                    Reportar Gasto
                </button>
            </form>
        </div >
    );
}

export default ExpenseForm;