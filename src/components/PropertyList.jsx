import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function PropertyList({ properties, leases, expenses }) {
  const { user } = useAuth();
  const occupiedCount = properties.filter((property) => property.status === 'Ocupado').length;

  return (
    <section className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Panel de Propiedades</h1>
          <p>Bienvenido, <strong>{user.name}</strong>. Revisa estados, contratos y gastos operativos.</p>
        </div>
        <Link to="/expense" className="secondary-button">Registrar gasto</Link>
      </div>

      <div className="metric-row" aria-label="Resumen de cartera">
        <div>
          <span>{properties.length}</span>
          <small>Propiedades</small>
        </div>
        <div>
          <span>{occupiedCount}</span>
          <small>Ocupadas</small>
        </div>
        <div>
          <span>{leases.length}</span>
          <small>Contratos activos</small>
        </div>
        <div>
          <span>{expenses.length}</span>
          <small>Gastos registrados</small>
        </div>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <article key={property.id} className="property-card">
            <div className="card-header">
              <span className={`status-pill status-${property.status.toLowerCase()}`}>
                {property.status}
              </span>
              <span className="property-id">{property.propertyId}</span>
            </div>
            <h2>{property.address}</h2>
            <p className="rent">US$ {property.rent.toLocaleString('es-PE')}</p>
            <p className="tenant">Arrendatario: {property.tenant}</p>
            <div className="card-actions">
              <Link to={`/property/${property.id}`} className="primary-link">
                Gestionar Contrato
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PropertyList;
