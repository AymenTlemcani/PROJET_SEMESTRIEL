// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/axious';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial loading state

  useEffect(() => {
    // Fetch the authenticated user
    apiClient
      .get('/user')
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = async (email, mot_de_passe) => {
    await apiClient.get('/sanctum/csrf-cookie'); // Ensure CSRF token is set
    return apiClient.post('/login', { email, mot_de_passe });
  };

  const logout = async () => {
    return apiClient.post('/logout').then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
