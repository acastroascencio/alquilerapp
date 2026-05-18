import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Asumiendo que el componente principal se llama App

// Nota: La importación de index.css se ha movido/comentado para resolver errores de build en el entorno de despliegue.

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Error de Montaje: No se encontró el elemento <div id='root'> en index.html.");
}
