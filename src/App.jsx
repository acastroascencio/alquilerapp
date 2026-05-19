import React, { useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import MonthlyExpensesModule from './components/MonthlyExpensesModule.jsx';
import TenantsModule from './components/TenantsModule.jsx';

const initialTenants = [
  {
    id: 'inq-001',
    fullName: 'Carlos Renteria',
    documentType: 'DNI',
    documentNumber: '45678912',
    phone: '987 654 321',
    email: 'carlos.renteria@email.com',
    property: 'Avenida Central 123',
    monthlyRent: 800,
    guarantee: 800,
    startDate: '2026-05-01',
    status: 'Activo',
  },
  {
    id: 'inq-002',
    fullName: 'Ana Torres',
    documentType: 'CE',
    documentNumber: 'CE-204578',
    phone: '955 120 400',
    email: 'ana.torres@email.com',
    property: 'Calle Los Sauces 45',
    monthlyRent: 1200,
    guarantee: 1200,
    startDate: '2026-04-15',
    status: 'Activo',
  },
];

const initialPersonalExpenses = [
  { id: 'gto-001', amount: 250, concept: 'Mercado familiar', date: '2026-05-03' },
  { id: 'gto-002', amount: 120, concept: 'Internet y telefonia', date: '2026-05-08' },
  { id: 'gto-003', amount: 90, concept: 'Transporte', date: '2026-04-22' },
];

function AppShell({ children, tenantCount, monthlyTotal }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/alquiler" className="brand">
          <span className="brand-mark">A</span>
          <span>
            <strong>AlquilerApp</strong>
            <small>Alquileres y gastos personales</small>
          </span>
        </Link>

        <nav className="nav-actions" aria-label="Modulos principales">
          <Link to="/alquiler">Alquiler</Link>
          <Link to="/gastos-mensuales">Gastos mensuales</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="status-strip">
        <span>{tenantCount} inquilino(s) registrados</span>
        <span>Total personal del mes: US$ {monthlyTotal.toLocaleString('es-PE')}</span>
      </footer>
    </div>
  );
}

function App() {
  const [tenants, setTenants] = useState(initialTenants);
  const [personalExpenses, setPersonalExpenses] = useState(initialPersonalExpenses);

  const currentMonthTotal = useMemo(() => {
    return personalExpenses
      .filter((expense) => expense.date.startsWith('2026-05'))
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [personalExpenses]);

  const handleTenantCreated = (tenant) => {
    setTenants((current) => [tenant, ...current]);
  };

  const handleExpenseCreated = (expense) => {
    setPersonalExpenses((current) => [expense, ...current]);
  };

  return (
    <AppShell tenantCount={tenants.length} monthlyTotal={currentMonthTotal}>
      <Routes>
        <Route path="/" element={<Navigate to="/alquiler" replace />} />
        <Route
          path="/alquiler"
          element={<TenantsModule tenants={tenants} onTenantCreated={handleTenantCreated} />}
        />
        <Route
          path="/gastos-mensuales"
          element={
            <MonthlyExpensesModule
              expenses={personalExpenses}
              onExpenseCreated={handleExpenseCreated}
            />
          }
        />
        <Route path="*" element={<Navigate to="/alquiler" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
