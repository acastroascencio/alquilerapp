import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// El selector debe coincidir con el id 'root' del index.html
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Error de Montaje: No se encontró el elemento <div id='root'> en index.html");
}
