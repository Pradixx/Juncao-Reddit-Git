import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import { useIdeas } from "../contexts/IdeasContext";

import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function IdeasListPage() {
  const navigate = useNavigate();
  const { ideas, deleteIdea, loading } = useIdeas();

  const [error, setError] = useState("");

  async function onDelete(id: string) {
    setError("");
    const ok = await deleteIdea(id);
    if (!ok) setError("Não foi possível excluir. Talvez você não seja o autor (403) ou o token expirou.");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-app py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Minhas ideias</h1>
              <p className="text-sm text-muted-foreground">
                Todas as ideias que o backend retornou para o seu usuário.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button onClick={() => navigate("/create-idea")}>Nova ideia</Button>
            </div>
          </div>

          {error && (
            <Alert>
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}

          {!loading && ideas.length === 0 && (
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">Nenhuma ideia encontrada.</p>
              <div className="mt-3">
                <Button onClick={() => navigate("/create-idea")}>Criar minha primeira ideia</Button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                description={idea.description}
                createdAt={idea.createdAt}
                onDelete={() => onDelete(idea.id)}
                onEdit={() => navigate(`/edit-idea/${idea.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
