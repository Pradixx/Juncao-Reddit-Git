import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import { useAuth } from "../contexts/AuthContext";
import { useIdeas } from "../contexts/IdeasContext";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { ideas, loading } = useIdeas();

  const lastIdeas = useMemo(() => ideas.slice(0, 3), [ideas]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-app py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo, <span className="font-medium">{user?.name ?? "Usuário"}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/ideas")}>
                Ver ideias
              </Button>
              <Button onClick={() => navigate("/create-idea")}>Nova ideia</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total</CardTitle>
                <CardDescription>Suas ideias cadastradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{ideas.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {loading ? "Atualizando..." : "Sincronizado com o backend"}
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Últimas ideias</CardTitle>
                <CardDescription>As mais recentes que você criou</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
                {!loading && lastIdeas.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Você ainda não tem ideias. Clique em “Nova ideia”.
                  </p>
                )}

                {!loading &&
                  lastIdeas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      id={idea.id}
                      title={idea.title}
                      description={idea.description}
                      createdAt={idea.createdAt}
                      showActions={false}
                      className="h-full"
                    />
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
