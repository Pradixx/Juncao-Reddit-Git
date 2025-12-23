import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useIdeas } from "../contexts/IdeasContext";

export default function ViewIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const { getIdea, deleteIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = useMemo(() => (id ? getIdea(id) : undefined), [getIdea, id]);

  if (!idea) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          Ideia não encontrada. <button className="underline" onClick={() => navigate("/ideas")}>Voltar</button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mx-auto w-full max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{idea.title}</CardTitle>
              <CardDescription>
                {idea.createdAt ? `Criado em ${new Date(idea.createdAt).toLocaleString()}` : "—"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{idea.description}</p>

              <div className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Voltar
                </Button>
                <Button variant="secondary" onClick={() => navigate(`/edit-idea/${idea.id}`)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await deleteIdea(idea.id);
                    navigate("/ideas");
                  }}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
