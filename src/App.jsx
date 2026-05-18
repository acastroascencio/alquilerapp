import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import LoginForm from './components/LoginForm';
import { useAuth } from './context/AuthContext';

// Componente que maneja la lógica de enrutamiento y protege las rutas.
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl">Cargando sesión...</div>;
    }

    if (!user) {
        // Redirigir a /login si no hay usuario y no estamos en la ruta de login
        return <Routes><Route path="*" element={<LoginForm />} /></Routes>;
    }

    return children;
};

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Barra de Navegación Global */}
            <header className="sticky top-0 z-10 bg-white shadow p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-indigo-700">AlquilerApp</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 pt-8">
                <Routes>
                    <Route path="/" element={<PropertyList />} />
                    <Route path="/login" element={<LoginForm />} />
                    {/* Las rutas protegidas se envolverán con ProtectedRoute */}
                    <Route path="/dashboard" element={<ProtectedRoute><PropertyList /></ProtectedRoute>} />
                    {/* Añadir más rutas protegidas aquí */}
                    <Route path="*" element={<h2 className="text-2xl text-red-500">404 - Página no encontrada</h2>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;