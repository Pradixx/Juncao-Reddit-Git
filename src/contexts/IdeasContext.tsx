import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  createdAt: string;
}

interface IdeasContextType {
  ideas: Idea[];
  createIdea: (title: string, description: string) => Promise<boolean>;
  updateIdea: (id: string, title: string, description: string) => Promise<boolean>;
  deleteIdea: (id: string) => Promise<boolean>;
  getIdea: (id: string) => Idea | undefined;
  getUserIdeas: () => Idea[];
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

const API_URL = 'http://localhost:8082/api/ideas';

export function IdeasProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchIdeas = async () => {
      if (!token) return;
      try {
        const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return;
        const data = await res.json();
        setIdeas(data);
      } catch (err) { console.error(err); }
    };
    fetchIdeas();
  }, [token]);

  const createIdea = async (title: string, description: string) => {
    if (!user) return false;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) return false;
      const newIdea = await res.json();
      setIdeas(prev => [newIdea, ...prev]);
      return true;
    } catch { return false; }
  };

  const updateIdea = async (id: string, title: string, description: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) return false;
      const updated = await res.json();
      setIdeas(prev => prev.map(i => i.id === id ? updated : i));
      return true;
    } catch { return false; }
  };

  const deleteIdea = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return false;
      setIdeas(prev => prev.filter(i => i.id !== id));
      return true;
    } catch { return false; }
  };

  return (
    <IdeasContext.Provider value={{
      ideas,
      createIdea,
      updateIdea,
      deleteIdea,
      getIdea: id => ideas.find(i => i.id === id),
      getUserIdeas: () => user ? ideas.filter(i => i.authorId === user.id) : []
    }}>
      {children}
    </IdeasContext.Provider>
  );
}

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) throw new Error('useIdeas deve ser usado dentro de IdeasProvider');
  return context;
}
