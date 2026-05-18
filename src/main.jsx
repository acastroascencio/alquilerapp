import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Asumiendo que el componente principal se llama App
import './index.css'; // Importa los estilos globales

// 1. Selector: Debe apuntar al contenedor que creamos en index.html
const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    
    // 2. Renderizado: Monta la aplicación React
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Error de Montaje: No se encontró el elemento <div id='root'> en index.html.");
}
