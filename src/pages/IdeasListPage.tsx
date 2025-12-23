import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useIdeas } from "../contexts/IdeasContext";

export default function IdeasListPage() {
  const navigate = useNavigate();
  const { ideas, deleteIdea } = useIdeas();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ideas;
    return ideas.filter((i) => (i.title + " " + i.description).toLowerCase().includes(q));
  }, [ideas, query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Ideias</h1>
            <p className="text-sm text-muted-foreground">Gerencie suas ideias criadas no microserviço.</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Voltar
            </Button>
            <Button onClick={() => navigate("/create-idea")}>Nova ideia</Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Lista</CardTitle>
            <input
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
              placeholder="Buscar por título ou descrição..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Nenhuma ideia encontrada.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    description={idea.description}
                    createdAt={idea.createdAt}
                    onDelete={() => deleteIdea(idea.id)}
                    onEdit={() => navigate(`/edit-idea/${idea.id}`)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
