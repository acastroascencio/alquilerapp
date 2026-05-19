import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PropertyList() {
    // Datos simulados de propiedades.
    const properties = [
        { id: 1, address: "Avenida Central 123", rent: 800, status: "Disponible" },
        { id: 2, address: "Calle Los Sauces 45", rent: 1200, status: "Ocupada" }
    ];

    return (
        <div className="min-h-full">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Panel de Propiedades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map(prop => (
                    <div key={prop.id} className={`p-6 border rounded-xl shadow-lg ${prop.status === 'Disponible' ? 'border-green-400 bg-white/80' : 'border-gray-200 bg-white/70'}`}>
                        <h3 className="text-2xl font-bold mb-1">{prop.address}</h3>
                        <p className="text-xl text-indigo-600 mb-3">${prop.rent.toLocaleString('es-ES')}</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${prop.status === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {prop.status}
                        </span>
                        <Link to={`/property/${prop.id}`} className="inline-block mt-4 text-indigo-700 hover:text-indigo-900 font-medium transition duration-150">
                            {prop.status === 'Disponible' ? 'Generar Contrato' : 'Ver Detalles'}
                        </Link>
                    </div>
                ))}
            </div >
        </div>
    );
}

export default PropertyList;