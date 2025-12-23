import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useIdeas } from '../contexts/IdeasContext';
import Alert from '../components/Alert';

export default function CreateIdeaPage() {
  const { createIdea } = useIdeas();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createIdea({ title, description });
    if (success) navigate('/ideas');
    else setError('Erro ao criar ideia, tente novamente');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Nova Ideia</h1>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 rounded w-full h-40"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Criar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
