import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useIdeas, Idea } from '../contexts/IdeasContext';
import { Plus } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { getUserIdeas } = useIdeas();
  const navigate = useNavigate();
  const ideas = getUserIdeas();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-7xl mx-auto p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Olá, {user?.name}!</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate('/ideas/new')} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Plus /> Nova Ideia
          </button>
          <button onClick={logout} className="bg-gray-300 px-4 py-2 rounded">Sair</button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        {ideas.map((idea: Idea) => (
          <div key={idea.id} className="bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => navigate(`/ideas/${idea.id}`)}>
            <h3 className="font-bold text-lg mb-2">{idea.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-3">{idea.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};
