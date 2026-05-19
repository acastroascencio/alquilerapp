import React, { useMemo, useState } from 'react';

const emptyExpense = {
  amount: '',
  concept: '',
  date: '2026-05-19',
};

function formatMonth(date) {
  const [year, month] = date.split('-');
  return `${year}-${month}`;
}

function MonthlyExpensesModule({ expenses, onExpenseCreated }) {
  const [expense, setExpense] = useState(emptyExpense);

  const monthlyTotals = useMemo(() => {
    return expenses.reduce((acc, item) => {
      const month = formatMonth(item.date);
      acc[month] = (acc[month] || 0) + item.amount;
      return acc;
    }, {});
  }, [expenses]);

  const sortedMonths = Object.entries(monthlyTotals).sort(([a], [b]) => b.localeCompare(a));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onExpenseCreated({
      id: `gto-${Date.now()}`,
      amount: Number(expense.amount),
      concept: expense.concept,
      date: expense.date,
    });
    setExpense(emptyExpense);
  };

  return (
    <section className="module-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Modulo Gastos Mensuales</p>
          <h1>Gastos personales</h1>
          <p>Registra gastos independientes del alquiler y revisa el total acumulado por mes.</p>
        </div>
      </div>

      <div className="split-layout">
        <form className="form-panel compact-form" onSubmit={handleSubmit}>
          <h2>Nuevo gasto</h2>
          <label htmlFor="amount">Monto</label>
          <input id="amount" name="amount" type="number" value={expense.amount} onChange={handleChange} required />

          <label htmlFor="concept">Concepto</label>
          <input id="concept" name="concept" value={expense.concept} onChange={handleChange} required />

          <label htmlFor="date">Fecha</label>
          <input id="date" name="date" type="date" value={expense.date} onChange={handleChange} required />

          <button type="submit" className="primary-button">Guardar gasto mensual</button>
        </form>

        <div className="table-panel">
          <h2>Totales por mes</h2>
          <div className="monthly-summary">
            {sortedMonths.map(([month, total]) => (
              <div className="month-total" key={month}>
                <span>{month}</span>
                <strong>US$ {total.toLocaleString('es-PE')}</strong>
              </div>
            ))}
          </div>

          <h2>Detalle de gastos</h2>
          <div className="record-list">
            {expenses.map((item) => (
              <article className="record-card" key={item.id}>
                <div>
                  <h3>{item.concept}</h3>
                  <p>{item.date}</p>
                </div>
                <div className="amount-block">
                  <strong>US$ {item.amount.toLocaleString('es-PE')}</strong>
                  <small>{formatMonth(item.date)}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MonthlyExpensesModule;
