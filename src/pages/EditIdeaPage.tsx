import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useIdeas } from "../contexts/IdeasContext";

export default function EditIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const { getIdea, updateIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = useMemo(() => (id ? getIdea(id) : undefined), [getIdea, id]);

  const [title, setTitle] = useState(idea?.title ?? "");
  const [description, setDescription] = useState(idea?.description ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idea) return;
    setTitle(idea.title);
    setDescription(idea.description);
  }, [idea]);

  useEffect(() => {
    if (!id) navigate("/ideas");
  }, [id, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setError(null);
    setLoading(true);

    const ok = await updateIdea(id, { title, description });
    setLoading(false);

    if (ok) navigate(`/view-idea/${id}`);
    else setError("Erro ao atualizar ideia.");
  };

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
        <div className="mx-auto w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Editar ideia</CardTitle>
              <CardDescription>Atualize os campos e salve.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Título</label>
                  <input
                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Descrição</label>
                  <textarea
                    className="min-h-[140px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
