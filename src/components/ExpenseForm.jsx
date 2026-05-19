import React, { useState } from 'react';

function ExpenseForm({ leases, onExpenseCreated }) {
  const [expense, setExpense] = useState({
    leaseId: leases[0]?.id || '',
    category: 'Servicios',
    amount: '',
    detail: '',
  });
  const [savedExpense, setSavedExpense] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedLease = leases.find((lease) => lease.id === expense.leaseId);
    const nextExpense = {
      id: `tx_${Date.now()}`,
      ...expense,
      amount: Number(expense.amount),
      propertyAddress: selectedLease?.propertyAddress || 'Sin propiedad',
    };
    setSavedExpense(nextExpense);
    onExpenseCreated(nextExpense);
  };

  return (
    <section className="work-surface">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Transacciones</p>
          <h1>Registrar Gasto</h1>
          <p>Vincula cada gasto a un contrato activo para mantener la trazabilidad.</p>
        </div>
      </div>

      {savedExpense && (
        <div className="success-banner" role="status">
          <strong>Gasto registrado:</strong> US$ {savedExpense.amount.toLocaleString('es-PE')} para {savedExpense.propertyAddress}.
        </div>
      )}

      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label htmlFor="leaseId">Contrato de alquiler</label>
          <select id="leaseId" name="leaseId" value={expense.leaseId} onChange={handleChange} required>
            {leases.map((lease) => (
              <option key={lease.id} value={lease.id}>
                {lease.id} - {lease.propertyAddress}
              </option>
            ))}
          </select>

          <label htmlFor="category">Categoria</label>
          <select id="category" name="category" value={expense.category} onChange={handleChange}>
            <option value="Servicios">Servicios</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Renta">Renta</option>
          </select>

          <label htmlFor="amount">Monto</label>
          <input id="amount" name="amount" type="number" value={expense.amount} onChange={handleChange} required />

          <label htmlFor="detail">Detalle</label>
          <input id="detail" name="detail" value={expense.detail} onChange={handleChange} required />
        </div>

        <button type="submit" className="primary-button">Guardar Gasto</button>
      </form>
    </section>
  );
}

export default ExpenseForm;
