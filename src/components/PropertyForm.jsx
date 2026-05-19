import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function PropertyForm({ properties, onLeaseCreated }) {
  const { id } = useParams();
  const { user } = useAuth();
  const property = properties.find((item) => item.id === id) || properties[0];
  const [createdLease, setCreatedLease] = useState(null);
  const [formData, setFormData] = useState({
    tenant: property.tenant === 'Pendiente' ? 'Carlos Renteria' : property.tenant,
    landlord: 'Mario Castro',
    rent: String(property.rent),
    deposit: String(property.rent),
    startDate: '2026-05-19',
  });

  const leaseId = useMemo(() => `lease_${property.propertyId}`, [property.propertyId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lease = {
      id: leaseId,
      propertyId: property.propertyId,
      propertyAddress: property.address,
      tenant: formData.tenant,
      landlord: formData.landlord,
      rent: Number(formData.rent),
      deposit: Number(formData.deposit),
      startDate: formData.startDate,
      status: 'Activo',
      createdBy: user.id,
    };
    onLeaseCreated(lease);
    setCreatedLease(lease);
  };

  return (
    <section className="work-surface">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Contrato</p>
          <h1>Generar Contrato</h1>
          <p>{property.address} - {property.propertyId}</p>
        </div>
        <Link to="/dashboard" className="secondary-button">Volver al panel</Link>
      </div>

      {createdLease && (
        <div className="success-banner" role="status">
          <strong>Contrato creado:</strong> {createdLease.id}. La propiedad ahora esta Ocupado y se registro el deposito inicial.
          <Link to="/expense">Registrar gasto</Link>
        </div>
      )}

      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label htmlFor="tenant">Arrendatario</label>
          <input id="tenant" name="tenant" value={formData.tenant} onChange={handleChange} required />

          <label htmlFor="landlord">Arrendador</label>
          <input id="landlord" name="landlord" value={formData.landlord} onChange={handleChange} required />

          <label htmlFor="rent">Renta mensual</label>
          <input id="rent" name="rent" type="number" value={formData.rent} onChange={handleChange} required />

          <label htmlFor="deposit">Deposito inicial</label>
          <input id="deposit" name="deposit" type="number" value={formData.deposit} onChange={handleChange} required />

          <label htmlFor="startDate">Fecha de inicio</label>
          <input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
        </div>

        <button type="submit" className="primary-button">
          Generar Contrato y Actualizar Estado
        </button>
      </form>
    </section>
  );
}

export default PropertyForm;
