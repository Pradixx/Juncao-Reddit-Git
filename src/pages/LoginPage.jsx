import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
    else setError('Credenciais inválidas');
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1>Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <form className="flex flex-col gap-2 w-full max-w-sm" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}
