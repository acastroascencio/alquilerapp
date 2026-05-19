import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginForm = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('user_mcastro@alquilerapp.test');
  const [password, setPassword] = useState('demo123');

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <section className="login-layout">
      <div className="login-copy">
        <p className="eyebrow">MVP Core</p>
        <h1>Control de alquileres con flujo completo de contrato y gastos</h1>
        <p>
          Ingresa con el usuario de pruebas del plan. La sesion carga el rol GESTOR
          y habilita el panel operativo.
        </p>
      </div>

      <form className="login-panel" onSubmit={handleLogin}>
        <h2>Inicia Sesion</h2>
        <p>Acceso al Sistema de Gestion de Alquileres.</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Contrasena</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
