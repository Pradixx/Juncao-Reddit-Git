import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';
import { Eye, Edit, Trash2 } from 'lucide-react';

export const IdeasListPage: React.FC = () => {
  const { ideas, deleteIdea } = useIdeas();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Ideias</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map(idea => (
          <div key={idea.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{idea.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3">{idea.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => navigate(`/ideas/${idea.id}`)} className="text-blue-600"><Eye size={18}/></button>
              <button onClick={() => navigate(`/ideas/edit/${idea.id}`)} className="text-green-600"><Edit size={18}/></button>
              <button onClick={() => deleteIdea(idea.id)} className="text-red-600"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
