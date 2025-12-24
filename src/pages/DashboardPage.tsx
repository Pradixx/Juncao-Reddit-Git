import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import { useAuth } from "../contexts/AuthContext";
import { useIdeas } from "../contexts/IdeasContext";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";


export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { myIdeas, loading } = useIdeas();

  const stats = useMemo(() => {
    const total = myIdeas.length;
    return { total };
  }, [myIdeas]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* “Figma feel”: fundo leve com gradiente */}
      <div className="w-full bg-gradient-to-b from-muted/40 via-background to-background">
        <main className="container-app py-8">
          <div className="flex flex-col gap-6">
            {/* Top */}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Dashboard
                  </h1>
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    IdeasHub
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Olá, <span className="font-medium text-foreground">{user?.name ?? "Usuário"}</span>.
                  Aqui estão suas ideias e atalhos rápidos.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => navigate("/create-idea")}>
                  Nova ideia
                </Button>
                <Button variant="outline" onClick={() => navigate("/ideas")}>
                  Ver todas
                </Button>
                <Button variant="secondary" onClick={() => navigate("/profile")}>
                  Perfil
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de ideias (suas)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-9 w-24" />
                  ) : (
                    <div className="text-3xl font-semibold">{stats.total}</div>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Baseado em <code>/api/ideas/my-ideas</code>
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dica de qualidade
                  </CardTitle>
                  <CardDescription>
                    Ideias boas = título claro + descrição com objetivo e próximos passos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted-foreground">
                    Quer manter tudo organizado? Use descrições com:
                    <span className="text-foreground font-medium"> problema → solução → MVP</span>.
                  </div>
                  <Button variant="outline" onClick={() => navigate("/create-idea")}>
                    Criar agora
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Ideas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight">Suas ideias recentes</h2>
                <Button variant="outline" onClick={() => navigate("/ideas")}>
                  Gerenciar
                </Button>
              </div>

              {loading ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-40 w-full rounded-lg" />
                </div>
              ) : myIdeas.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      Você ainda não tem ideias. Crie a primeira agora.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Button onClick={() => navigate("/create-idea")}>Criar ideia</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {myIdeas.slice(0, 6).map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      id={idea.id}
                      title={idea.title}
                      description={idea.description}
                      createdAt={idea.createdAt}
                      onEdit={() => navigate(`/edit-idea/${idea.id}`)}
                      onDelete={() => navigate(`/ideas?delete=${idea.id}`)}
                      showActions
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
