import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email) => {
    setLoading(true);
    const profile = {
      id: 'user_mcastro',
      email,
      name: 'user_mcastro',
      role: 'GESTOR',
    };
    setUser(profile);
    setLoading(false);
    return profile;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
