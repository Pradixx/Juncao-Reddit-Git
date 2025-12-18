import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <Link to="/dashboard" className="text-white text-decoration-none">IdeasHub</Link>
      <nav>
        {user ? (
          <>
            <Link to="/profile" className="text-white me-3">Perfil</Link>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <Link to="/login" className="text-white">Login</Link>
        )}
      </nav>
    </header>
  );
}
