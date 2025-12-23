import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useIdeas } from '../contexts/IdeasContext';

export default function ViewIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const { getIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = getIdea(id!);
  if (!idea) return <p>Ideia não encontrada</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
        <p className="text-gray-700 mb-4">{idea.description}</p>
        <button onClick={() => navigate('/ideas')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Voltar</button>
      </main>
      <Footer />
    </div>
  );
}
