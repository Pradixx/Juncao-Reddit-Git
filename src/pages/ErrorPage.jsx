import { useNavigate } from 'react-router-dom';
import { FileQuestion, Lock, Home } from 'lucide-react';

export default function ErrorPage({ type = '404' }) {
  const navigate = useNavigate();
  const is403 = type === '403';

  return (
    <div className="container flex flex-col items-center justify-center h-screen text-center gap-4">
      {is403 ? <Lock className="w-20 h-20 text-danger mb-4" /> : <FileQuestion className="w-20 h-20 text-primary mb-4" />}
      <h1 className="display-1">{type}</h1>
      <p>{is403 ? 'Acesso Negado' : 'Página não encontrada'}</p>
      <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
        <Home /> Voltar ao Início
      </button>
    </div>
  );
}
