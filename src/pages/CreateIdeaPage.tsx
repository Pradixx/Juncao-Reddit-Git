import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';

export const CreateIdeaPage: React.FC = () => {
  const { createIdea } = useIdeas();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await createIdea({ title, description });
    if (success) navigate('/dashboard');
    else setError('Erro ao criar ideia');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold">Nova Ideia</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded h-32" required />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Criar</button>
          <button type="button" onClick={() => navigate('/dashboard')} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
};
