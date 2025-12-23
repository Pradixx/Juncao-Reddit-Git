import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdeas, Idea } from '../contexts/IdeasContext';

export const ViewIdeaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = id ? getIdea(id) : undefined;

  if (!idea) return <p className="text-center mt-10">Ideia não encontrada</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
        <p className="text-gray-600 mb-4">{idea.description}</p>
        <p className="text-sm text-gray-400">Autor: {idea.authorId}</p>
        <p className="text-xs text-gray-400">Criado em: {new Date(idea.createdAt).toLocaleString()}</p>
        <button onClick={() => navigate('/ideas')} className="mt-4 bg-gray-300 px-4 py-2 rounded">Voltar</button>
      </div>
    </div>
  );
};
