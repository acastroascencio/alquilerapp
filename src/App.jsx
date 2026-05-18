import React from 'react';
// Importar aquí el contexto de autenticación y las rutas principales
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import LoginForm from './components/LoginForm';
import { useAuth } from './context/AuthContext';

function App() {
    const { currentUser } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Barra de Navegación Global (Aquí iría el Sidebar/Header) */}
            <header className="p-4 bg-white shadow sticky top-0 z-10">
                <h1 className="text-xl font-bold text-indigo-700">AlquilerApp</h1>
            </header>

            <main className="container mx-auto p-4">
                {/* Aquí se usaría un componente RouterProvider que maneja la lógica de qué vista mostrar */}
                {currentUser ? (
                    <Routes>
                        <Route path="/" element={<PropertyList />} />
                        <Route path="/login" element={<LoginForm />} />
                        {/* Rutas futuras: /propiedades/:id/contract, /gastos */}
                    </Routes>
                ) : (
                    <div className="text-center p-10">
                        <LoginForm />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;