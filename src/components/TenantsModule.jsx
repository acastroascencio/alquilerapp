import React, { useState } from 'react';

const emptyTenant = {
  fullName: '',
  documentType: 'DNI',
  documentNumber: '',
  phone: '',
  email: '',
  property: '',
  monthlyRent: '',
  guarantee: '',
  startDate: '2026-05-19',
  status: 'Activo',
};

function TenantsModule({ tenants, onTenantCreated }) {
  const [tenant, setTenant] = useState(emptyTenant);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTenant((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onTenantCreated({
      ...tenant,
      id: `inq-${Date.now()}`,
      monthlyRent: Number(tenant.monthlyRent),
      guarantee: Number(tenant.guarantee),
    });
    setTenant(emptyTenant);
  };

  const totalRent = tenants.reduce((sum, item) => sum + item.monthlyRent, 0);

  return (
    <section className="module-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Modulo Alquiler</p>
          <h1>Registro de inquilinos</h1>
          <p>Administra solo informacion de alquiler: inquilino, inmueble, renta, garantia y datos de contacto.</p>
        </div>
      </div>

      <div className="metric-row" aria-label="Resumen de alquiler">
        <div>
          <span>{tenants.length}</span>
          <small>Inquilinos</small>
        </div>
        <div>
          <span>US$ {totalRent.toLocaleString('es-PE')}</span>
          <small>Renta mensual esperada</small>
        </div>
        <div>
          <span>{tenants.filter((item) => item.status === 'Activo').length}</span>
          <small>Activos</small>
        </div>
      </div>

      <div className="split-layout">
        <form className="form-panel" onSubmit={handleSubmit}>
          <h2>Nuevo inquilino</h2>
          <div className="form-grid">
            <label htmlFor="fullName">Nombre completo</label>
            <input id="fullName" name="fullName" value={tenant.fullName} onChange={handleChange} required />

            <label htmlFor="documentType">Tipo de documento</label>
            <select id="documentType" name="documentType" value={tenant.documentType} onChange={handleChange}>
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>

            <label htmlFor="documentNumber">Numero de documento</label>
            <input id="documentNumber" name="documentNumber" value={tenant.documentNumber} onChange={handleChange} required />

            <label htmlFor="phone">Telefono</label>
            <input id="phone" name="phone" value={tenant.phone} onChange={handleChange} required />

            <label htmlFor="email">Correo</label>
            <input id="email" name="email" type="email" value={tenant.email} onChange={handleChange} required />

            <label htmlFor="property">Inmueble alquilado</label>
            <input id="property" name="property" value={tenant.property} onChange={handleChange} required />

            <label htmlFor="monthlyRent">Monto de alquiler</label>
            <input id="monthlyRent" name="monthlyRent" type="number" value={tenant.monthlyRent} onChange={handleChange} required />

            <label htmlFor="guarantee">Monto de garantia</label>
            <input id="guarantee" name="guarantee" type="number" value={tenant.guarantee} onChange={handleChange} required />

            <label htmlFor="startDate">Fecha de inicio</label>
            <input id="startDate" name="startDate" type="date" value={tenant.startDate} onChange={handleChange} required />
          </div>
          <button type="submit" className="primary-button">Guardar inquilino</button>
        </form>

        <div className="table-panel">
          <h2>Inquilinos registrados</h2>
          <div className="record-list">
            {tenants.map((item) => (
              <article className="record-card" key={item.id}>
                <div>
                  <h3>{item.fullName}</h3>
                  <p>{item.documentType} {item.documentNumber} · {item.phone}</p>
                  <p>{item.property}</p>
                </div>
                <div className="amount-block">
                  <strong>US$ {item.monthlyRent.toLocaleString('es-PE')}</strong>
                  <small>Garantia US$ {item.guarantee.toLocaleString('es-PE')}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TenantsModule;
