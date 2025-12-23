import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useIdeas } from '../contexts/IdeasContext';
import Alert from '../components/Alert';

export default function EditIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const { getIdea, updateIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = getIdea(id!);
  const [title, setTitle] = useState(idea?.title || '');
  const [description, setDescription] = useState(idea?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!idea) navigate('/ideas');
  }, [idea, navigate]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateIdea(id!, { title, description });
    if (success) navigate('/ideas');
    else setError('Erro ao atualizar ideia');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Editar Ideia</h1>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded w-full" required />
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded w-full h-40" required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Atualizar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
