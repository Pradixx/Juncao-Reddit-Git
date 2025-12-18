import { useParams, useNavigate } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';

export default function ViewIdeaPage() {
  const { id } = useParams();
  const { getIdea } = useIdeas();
  const navigate = useNavigate();
  const idea = getIdea(id);

  if (!idea) return <p>Ideia não encontrada</p>;

  return (
    <div className="container flex flex-col gap-4">
      <h1>{idea.title}</h1>
      <p>{idea.description}</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}
