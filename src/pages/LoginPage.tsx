import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
    else setError('Credenciais inválidas');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
      </form>
    </div>
  );
};
