import { useIdeas } from '../contexts/IdeasContext';
import { useNavigate } from 'react-router-dom';

export default function IdeasListPage() {
  const { ideas, deleteIdea } = useIdeas();
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col gap-4">
      <h1>Minhas Ideias</h1>
      <button className="btn btn-primary" onClick={() => navigate('/create-idea')}>Nova Ideia</button>
      {ideas.length === 0 && <p>Nenhuma ideia encontrada</p>}
      <div className="flex flex-col gap-2">
        {ideas.map(idea => (
          <div key={idea.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h4>{idea.title}</h4>
              <p>{idea.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/view-idea/${idea.id}`)}>Ver</button>
              <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-idea/${idea.id}`)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteIdea(idea.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
