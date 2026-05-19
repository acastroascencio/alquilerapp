import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importación simulada de Firebase o Auth Provider
// import { auth } from '../firebaseConfig'; 

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // *** SIMULACIÓN DE AUTENTICACIÓN ***
    useEffect(() => {
        // En un entorno real, aquí se usaría onAuthStateChanged de Firebase
        const unsubscribe = () => {
            // Simulación: Tras un breve retraso, el usuario ha iniciado sesión.
            setTimeout(() => {
                setUser({ email: "user@ejemplo.com", name: "Usuario Demo", role: "GESTOR" });
                setLoading(false);
            }, 1000);
        };
        unsubscribe();
    }, [navigate]);

    const login = (email, password) => {
        // Lógica real de login a Firebase
        console.log("Intentando login para:", email);
        setUser({ email: email, name: "Usuario Demo", role: "GESTOR" });
    };

    const logout = () => {
        // Lógica real de logout de Firebase
        setUser(null);
    };

    // Efecto para redirigir al usuario si no está logueado
    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
        }
    }, [loading, user, navigate]);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};