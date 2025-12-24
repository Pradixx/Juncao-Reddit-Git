import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useIdeas } from "../contexts/IdeasContext";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function ViewIdeaPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getIdea } = useIdeas();

  const idea = useMemo(() => (id ? getIdea(id) : undefined), [getIdea, id]);

  if (!id) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-app py-10">
          <Alert>
            <AlertTitle>Rota inválida</AlertTitle>
            <AlertDescription>ID não informado.</AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-app py-10">
          <Alert>
            <AlertTitle>Ideia não encontrada</AlertTitle>
            <AlertDescription>
              Essa ideia não está no cache do front. Volte e atualize a lista.
            </AlertDescription>
          </Alert>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
            <Button onClick={() => navigate("/ideas")}>Ir para Ideias</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full bg-gradient-to-b from-muted/40 via-background to-background">
        <main className="container-app py-8">
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {idea.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Criado em: {idea.createdAt ? new Date(idea.createdAt).toLocaleString() : "—"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Voltar
                </Button>
                <Button onClick={() => navigate(`/edit-idea/${idea.id}`)}>
                  Editar
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
                <CardDescription>Detalhes completos da ideia.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {idea.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
