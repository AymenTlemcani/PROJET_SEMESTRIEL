// src/components/Login.js
import React, { useState, useContext } from 'react';
import apiClient from '../api/axious';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/login', { email, password }).then((response) => {
        setUser(response.data.user);
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
