import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";
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
  myIdeas: Idea[];
  loading: boolean;

  refreshAll: () => Promise<void>;
  refreshMine: () => Promise<void>;

  createIdea: (idea: { title: string; description: string }) => Promise<boolean>;
  updateIdea: (id: string, idea: { title: string; description: string }) => Promise<boolean>;
  deleteIdea: (id: string) => Promise<boolean>;

  getIdea: (id: string) => Idea | undefined;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

const API_URL = "http://localhost:8082/api/ideas";

export function IdeasProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, token } = useAuth();

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [myIdeas, setMyIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const authHeaders = useCallback((): Record<string, string> => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const refreshAll = useCallback(async () => {
    if (!isAuthenticated) {
      setIdeas([]);
      return;
    }

    try {
      const res = await fetch(API_URL, { headers: authHeaders() });

      if (!res.ok) {
        setIdeas([]);
        return;
      }

      const data = (await res.json()) as Idea[];
      setIdeas(data);
    } catch (err) {
      console.error(err);
      setIdeas([]);
    }
  }, [authHeaders, isAuthenticated]);

  const refreshMine = useCallback(async () => {
    if (!isAuthenticated) {
      setMyIdeas([]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/my-ideas`, { headers: authHeaders() });

      if (!res.ok) {
        setMyIdeas([]);
        return;
      }

      const data = (await res.json()) as Idea[];
      setMyIdeas(data);
    } catch (err) {
      console.error(err);
      setMyIdeas([]);
    }
  }, [authHeaders, isAuthenticated]);

  const refreshBoot = useCallback(async () => {
    if (!isAuthenticated) {
      setIdeas([]);
      setMyIdeas([]);
      return;
    }

    setLoading(true);
    try {
      await Promise.all([refreshAll(), refreshMine()]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, refreshAll, refreshMine]);

  useEffect(() => {
    refreshBoot();
  }, [refreshBoot]);

  const createIdea = async (idea: { title: string; description: string }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(idea),
      });

      if (!res.ok) return false;

      await refreshBoot();
      return true;
    } catch {
      return false;
    }
  };

  const updateIdea = async (id: string, idea: { title: string; description: string }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(idea),
      });

      if (!res.ok) return false;

      await refreshBoot();
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

      await refreshBoot();
      return true;
    } catch {
      return false;
    }
  };

  const value = useMemo<IdeasContextType>(
    () => ({
      ideas,
      myIdeas,
      loading,
      refreshAll,
      refreshMine,
      createIdea,
      updateIdea,
      deleteIdea,
      getIdea: (id) => myIdeas.find((i) => i.id === id) ?? ideas.find((i) => i.id === id),
    }),
    [ideas, myIdeas, loading, refreshAll, refreshMine]
  );

  return <IdeasContext.Provider value={value}>{children}</IdeasContext.Provider>;
}

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) throw new Error("useIdeas deve ser usado dentro de IdeasProvider");
  return context;
}
