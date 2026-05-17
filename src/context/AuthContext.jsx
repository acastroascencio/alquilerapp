# ARCHIVO: src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Nota: Importar las funciones de backend simuladas o reales
// import { obtenerPerfilUsuario } from '../services/firebaseFunctions'; 

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- 1. Observador de Auth de Firebase ---
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // 2. Sincronizar Perfil con el Backend (Cloud Function)
                console.log("Usuario detectado. Iniciando sincronización de perfil...");
                // *** IMPLEMENTACIÓN REAL: Llamar a la Cloud Function ***
                // obtenerPerfilUsuario(user.uid).then(data => {
                //     setUser({ uid: user.uid, email: user.email, rol: data.user.rol });
                //     setUserRole(data.user.rol);
                // });
                
                // SIMULACIÓN DE ÉXITO PARA EJECUCIÓN: Se asume un rol inicial.
                // En producción, esto debe esperar al resultado de la Cloud Function.
                setUser({
                    uid: user.uid,
                    email: user.email,
                    rol: 'ADMIN' // <-- DEBE SER DINÁMICO
                });
                setUserRole('ADMIN'); // Simulación de rol obtenido
            } else {
                setCurrentUser(null);
                setUserRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // --- Métodos de Auth ---
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // El onAuthStateChanged maneja el resto, lo que dispara la sincronización del perfil.
            return true;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        signOut(auth); // Desconecta al usuario
    };

    // Valor que proveemos a toda la aplicación
    const contextValue = {
        user: currentUser,
        role: userRole,
        isAuthenticated: !!currentUser,
        loading: loading,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {loading ? <div className=\"text-center p-10 text-lg\">Cargando sesión...</div> : children}
        </AuthContext.Provider>
    );
};

// Context Hook para consumo
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;