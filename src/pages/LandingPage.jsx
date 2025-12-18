import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1>Bem-vindo ao IdeasHub</h1>
      <p>Gerencie suas ideias de forma simples e rápida</p>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Entrar</button>
        <button className="btn btn-secondary" onClick={() => navigate('/register')}>Registrar</button>
      </div>
    </div>
  );
}
