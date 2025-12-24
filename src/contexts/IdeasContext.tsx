import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";

export interface Idea {
  id: string;
  title: string;
  description: string;
  authorId: string; 
  createdAt: string;
}

interface IdeasContextType {
  ideas: Idea[];
  loading: boolean;
  refreshIdeas: () => Promise<void>;

  createIdea: (idea: { title: string; description: string }) => Promise<boolean>;
  updateIdea: (id: string, idea: { title: string; description: string }) => Promise<boolean>;
  deleteIdea: (id: string) => Promise<boolean>;

  getIdea: (id: string) => Idea | undefined;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

const API_URL = "http://localhost:8082/api/ideas";

export function IdeasProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const authHeaders = useCallback((): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const refreshIdeas = useCallback(async () => {
    if (!isAuthenticated) {
      setIdeas([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/my-ideas`, {
        headers: authHeaders(),
      });
      if (!res.ok) {
        setIdeas([]);
        return;
      }
      const data = (await res.json()) as Idea[];
      setIdeas(data);
    } catch (err) {
      console.error(err);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  }, [authHeaders, isAuthenticated]);

  useEffect(() => {
    refreshIdeas();
  }, [refreshIdeas]);

  const createIdea = async (idea: { title: string; description: string }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify(idea), 
      });
      if (!res.ok) return false;

      const newIdea = (await res.json()) as Idea;
      setIdeas((prev) => [newIdea, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  const updateIdea = async (id: string, idea: { title: string; description: string }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify(idea),
      });
      if (!res.ok) return false;

      const updated = (await res.json()) as Idea;
      setIdeas((prev) => prev.map((i) => (i.id === id ? updated : i)));
      return true;
    } catch {
      return false;
    }
  };

  const deleteIdea = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) return false;

      setIdeas((prev) => prev.filter((i) => i.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const value = useMemo<IdeasContextType>(
    () => ({
      ideas,
      loading,
      refreshIdeas,
      createIdea,
      updateIdea,
      deleteIdea,
      getIdea: (id) => ideas.find((i) => i.id === id),
    }),
    [ideas, loading, refreshIdeas]
  );

  return <IdeasContext.Provider value={value}>{children}</IdeasContext.Provider>;
}

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) throw new Error("useIdeas deve ser usado dentro de IdeasProvider");
  return context;
}
