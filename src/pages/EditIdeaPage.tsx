import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdeas, Idea } from '../contexts/IdeasContext';

export const EditIdeaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIdea, updateIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = id ? getIdea(id) : undefined;

  const [title, setTitle] = useState(idea?.title || '');
  const [description, setDescription] = useState(idea?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!idea) navigate('/ideas');
  }, [idea, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const success = await updateIdea(id, { title, description });
    if (success) navigate(`/ideas/${id}`);
    else setError('Erro ao atualizar ideia');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold">Editar Ideia</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded h-32" required />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
          <button type="button" onClick={() => navigate(`/ideas/${id}`)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};
