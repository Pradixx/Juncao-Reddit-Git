import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../components/Alert';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate('/dashboard');
    else setError('Erro ao registrar, tente novamente');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">Registrar</h2>
          {error && <Alert message={error} type="error" />}
          <input
            type="text"
            placeholder="Nome"
            className="w-full border p-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Registrar</button>
          <p className="text-sm text-gray-500 text-center">
            Já tem conta? <Link to="/login" className="text-blue-600 hover:underline">Entrar</Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
