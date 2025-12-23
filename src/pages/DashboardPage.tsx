import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useIdeas } from "../contexts/IdeasContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { ideas } = useIdeas();
  const navigate = useNavigate();

  const recent = useMemo(() => ideas.slice(0, 4), [ideas]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Bem-vindo, <span className="text-foreground font-medium">{user?.name ?? "Usuário"}</span>.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/ideas")}>
              Ver todas
            </Button>
            <Button onClick={() => navigate("/create-idea")}>Nova ideia</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total de ideias</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{ideas.length}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              CRUD ativo via microserviço (8082) com token do RedGit (8081).
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Atalhos</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/profile")}>Perfil</Button>
              <Button variant="secondary" onClick={() => navigate("/ideas")}>Ideias</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base">Recentes</CardTitle>
            <Button variant="outline" onClick={() => navigate("/ideas")}>Abrir lista</Button>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Você ainda não criou nenhuma ideia.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {recent.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    description={idea.description}
                    createdAt={idea.createdAt}
                    showActions={false}
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
