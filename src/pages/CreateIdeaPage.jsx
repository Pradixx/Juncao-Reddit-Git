import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';

export default function CreateIdeaPage() {
  const { createIdea } = useIdeas();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createIdea(title, description);
    if (success) navigate('/dashboard');
    else setError('Erro ao criar ideia');
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1>Criar Nova Ideia</h1>
      {error && <p className="text-danger">{error}</p>}
      <form className="flex flex-col gap-2 w-full max-w-md" onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" required />
        <button type="submit" className="btn btn-primary">Criar Ideia</button>
      </form>
    </div>
  );
}
