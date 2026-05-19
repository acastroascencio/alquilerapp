import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error de Login:', error);
    }
  };

  return (
    <div className="p-8 bg-white shadow-2xl rounded-xl max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-indigo-800">Inicia Sesion</h2>
      <p className="mb-8 text-gray-500">Acceso al Sistema de Gestion de Alquileres.</p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="tu@empresa.com"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
              Ingresando...
            </div>
          ) : (
            'Ingresar'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
