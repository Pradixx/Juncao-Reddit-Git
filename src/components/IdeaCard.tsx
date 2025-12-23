import Card from './Card';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Idea } from '../contexts/IdeasContext';
import Button from './Button';

interface IdeaCardProps {
  idea: Idea;
  onDelete?: (id: string) => void;
}

export default function IdeaCard({ idea, onDelete }: IdeaCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{idea.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{idea.description}</p>
          <p className="text-xs text-gray-400">By {idea.authorId}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/view-idea/${idea.id}`)} variant="secondary"><Eye size={16} /></Button>
          <Button onClick={() => navigate(`/edit-idea/${idea.id}`)} variant="primary"><Edit size={16} /></Button>
          {onDelete && <Button onClick={() => onDelete(idea.id)} variant="danger"><Trash2 size={16} /></Button>}
        </div>
      </div>
    </Card>
  );
}
