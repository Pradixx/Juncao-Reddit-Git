import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password); // <- name, email, password
    if (success) navigate('/dashboard');
    else setError('Erro ao registrar. Confira os campos e a senha.');
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1>Registrar</h1>
      {error && <p className="text-danger">{error}</p>}
      <form className="flex flex-col gap-2 w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
}
