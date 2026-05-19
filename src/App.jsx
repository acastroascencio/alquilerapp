import React, { useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import PropertyForm from './components/PropertyForm.jsx';
import PropertyList from './components/PropertyList.jsx';
import { useAuth } from './context/AuthContext.jsx';

const initialProperties = [
  {
    id: '1',
    propertyId: 'prop_dummy_123',
    address: 'Avenida Central 123',
    rent: 800,
    status: 'Disponible',
    tenant: 'Carlos Renteria',
  },
  {
    id: '2',
    propertyId: 'prop_los_sauces_45',
    address: 'Calle Los Sauces 45',
    rent: 1200,
    status: 'Ocupado',
    tenant: 'Ana Torres',
  },
  {
    id: '3',
    propertyId: 'prop_parque_sur_18',
    address: 'Jiron Parque Sur 18',
    rent: 950,
    status: 'Mantenimiento',
    tenant: 'Pendiente',
  },
];

const initialLeases = [
  {
    id: 'lease_prop_los_sauces_45',
    propertyId: 'prop_los_sauces_45',
    propertyAddress: 'Calle Los Sauces 45',
    tenant: 'Ana Torres',
    landlord: 'Mario Castro',
    rent: 1200,
    deposit: 1200,
    status: 'Activo',
  },
];

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppShell({ children, leases }) {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to={user ? '/dashboard' : '/login'} className="brand">
          <span className="brand-mark">A</span>
          <span>
            <strong>AlquilerApp</strong>
            <small>Gestion inmobiliaria</small>
          </span>
        </Link>

        {user && (
          <nav className="nav-actions" aria-label="Navegacion principal">
            <Link to="/dashboard">Propiedades</Link>
            <Link to="/expense">Registrar gasto</Link>
            <span className="user-chip">{user.name} - {user.role}</span>
            <button type="button" className="ghost-button" onClick={logout}>Salir</button>
          </nav>
        )}
      </header>

      <main>{children}</main>

      {user && (
        <footer className="status-strip">
          <span>{leases.length} contrato(s) activo(s)</span>
          <span>Flujo demo segun TEST_PLAN.md</span>
        </footer>
      )}
    </div>
  );
}

function App() {
  const [properties, setProperties] = useState(initialProperties);
  const [leases, setLeases] = useState(initialLeases);
  const [expenses, setExpenses] = useState([]);

  const activeLeases = useMemo(() => leases.filter((lease) => lease.status === 'Activo'), [leases]);

  const handleLeaseCreated = (lease) => {
    setLeases((current) => {
      const withoutDuplicate = current.filter((item) => item.id !== lease.id);
      return [lease, ...withoutDuplicate];
    });
    setProperties((current) =>
      current.map((property) =>
        property.propertyId === lease.propertyId
          ? { ...property, status: 'Ocupado', tenant: lease.tenant }
          : property
      )
    );
  };

  const handleExpenseCreated = (expense) => {
    setExpenses((current) => [expense, ...current]);
  };

  return (
    <AppShell leases={activeLeases}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PropertyList properties={properties} leases={activeLeases} expenses={expenses} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property/:id"
          element={
            <ProtectedRoute>
              <PropertyForm properties={properties} onLeaseCreated={handleLeaseCreated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <ExpenseForm leases={activeLeases} onExpenseCreated={handleExpenseCreated} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
