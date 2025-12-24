import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const API_URL = "http://localhost:8082/api/ideas";

export default function ViewIdeaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setError("");
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) {
          setError(res.status === 404 ? "Ideia não encontrada." : "Não foi possível carregar a ideia.");
          return;
        }
        setIdea(await res.json());
      } catch {
        setError("Erro inesperado ao carregar.");
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-app py-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Visualizar ideia</h1>
              <p className="text-sm text-muted-foreground">Detalhes completos do registro.</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Voltar
              </Button>
              {id && (
                <Button onClick={() => navigate(`/edit-idea/${id}`)}>
                  Editar
                </Button>
              )}
            </div>
          </div>

          {error && (
            <Alert>
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}

          {!loading && idea && (
            <Card>
              <CardHeader>
                <CardTitle>{idea.title}</CardTitle>
                <CardDescription>
                  Criado em: {idea.createdAt ? new Date(idea.createdAt).toLocaleString() : "—"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{idea.description}</p>
                <div className="text-xs text-muted-foreground">authorId: {idea.authorId ?? "—"}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
