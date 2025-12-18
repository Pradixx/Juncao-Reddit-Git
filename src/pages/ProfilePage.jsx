import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col gap-4">
      <h1>Perfil</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button className="btn btn-secondary" onClick={() => { logout(); navigate('/login'); }}>
        Sair
      </button>
    </div>
  );
}
