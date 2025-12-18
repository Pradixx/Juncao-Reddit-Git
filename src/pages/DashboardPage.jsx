import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col gap-4">
      <h1>Bem-vindo, {user?.username}</h1>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => navigate('/create-idea')}>
          Criar Ideia
        </button>
        <button className="btn btn-secondary" onClick={() => { logout(); navigate('/login'); }}>
          Sair
        </button>
      </div>
    </div>
  );
}
