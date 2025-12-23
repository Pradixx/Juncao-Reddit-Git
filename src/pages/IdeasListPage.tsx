import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useIdeas } from '../contexts/IdeasContext';
import { Edit, Trash2, Eye } from 'lucide-react';

export default function IdeasListPage() {
  const { ideas, deleteIdea } = useIdeas();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Ideias</h1>
          <button onClick={() => navigate('/create-idea')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Nova Ideia</button>
        </div>
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
          {ideas.map(idea => (
            <div key={idea.id} className="p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-semibold">{idea.title}</p>
                <p className="text-xs text-gray-500">Por {idea.authorId}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate(`/view-idea/${idea.id}`)} className="p-2 text-blue-600"><Eye size={18} /></button>
                <button onClick={() => navigate(`/edit-idea/${idea.id}`)} className="p-2 text-green-600"><Edit size={18} /></button>
                <button onClick={() => deleteIdea(idea.id)} className="p-2 text-red-600"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
