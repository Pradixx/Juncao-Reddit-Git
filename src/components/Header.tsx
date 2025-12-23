import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react'; // ícone de usuário
import Button from './Button';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">IdeaHub</Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Button onClick={() => navigate('/dashboard')} variant="secondary">Dashboard</Button>
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-gray-700 dark:text-gray-200"/>
                <span className="hidden sm:block text-gray-700 dark:text-gray-200">{user.name}</span>
              </div>
              <Button onClick={logout} variant="danger">Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variant="secondary">Login</Button>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
