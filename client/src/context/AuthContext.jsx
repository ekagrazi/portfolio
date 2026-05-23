import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken]     = useState(localStorage.getItem('admin_token'));
  const [admin, setAdmin]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Persist token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }, [token]);

  // On mount (or token change): verify token with the backend
  const verify = useCallback(async () => {
    if (!token) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/auth/verify');
      setAdmin(data.admin);
    } catch {
      // Token invalid or expired — clear
      setToken(null);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  // Login: call the backend, store token + admin
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  // Logout: clear everything
  const logout = () => {
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
