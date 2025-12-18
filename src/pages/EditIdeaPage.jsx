import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';

export default function EditIdeaPage() {
  const { id } = useParams();
  const { getIdea, updateIdea } = useIdeas();
  const navigate = useNavigate();
  const idea = getIdea(id);
  
  const [title, setTitle] = useState(idea?.title || '');
  const [description, setDescription] = useState(idea?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!idea) navigate('/ideas');
  }, [idea, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateIdea(id, title, description);
    if (success) navigate('/ideas');
    else setError('Erro ao atualizar ideia');
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1>Editar Ideia</h1>
      {error && <p className="text-danger">{error}</p>}
      <form className="flex flex-col gap-2 w-full max-w-md" onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
      </form>
    </div>
  );
}
