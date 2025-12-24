import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useIdeas } from "../contexts/IdeasContext";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function EditIdeaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getIdea, updateIdea } = useIdeas();

  const existing = id ? getIdea(id) : undefined;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) navigate("/ideas");
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description);
    }
  }, [id, existing, navigate]);

  const titleLen = title.trim().length;
  const descLen = description.trim().length;

  const canSubmit = useMemo(() => {
    return titleLen >= 3 && descLen >= 10 && !submitting;
  }, [titleLen, descLen, submitting]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!id) return;

    if (titleLen < 3) {
      setError("O título precisa ter pelo menos 3 caracteres.");
      return;
    }
    if (descLen < 10) {
      setError("A descrição precisa ter pelo menos 10 caracteres.");
      return;
    }

    setSubmitting(true);
    try {
      const ok = await updateIdea(id, {
        title: title.trim(),
        description: description.trim(),
      });

      if (!ok) {
        setError("Não foi possível atualizar. Se você não for o autor, o backend retorna 403.");
        return;
      }

      navigate("/ideas");
    } catch {
      setError("Erro inesperado ao salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-app py-8">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Editar ideia</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Atualize o título e a descrição.
            </p>
          </div>

          {error && (
            <div className="mb-4">
              <Alert>
                <AlertTitle>Algo deu errado</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
              <CardDescription>Altere apenas o necessário.</CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mínimo 3 caracteres</span>
                    <span>{titleLen}/80</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mínimo 10 caracteres</span>
                    <span>{descLen}/800</span>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={submitting}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={!canSubmit}>
                    {submitting ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {!existing && (
            <p className="mt-3 text-xs text-muted-foreground">
              Se a ideia não apareceu aqui, volte para a lista e tente abrir de novo.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
