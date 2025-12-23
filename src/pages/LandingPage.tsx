import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Organize suas ideias com um fluxo profissional.
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Crie, edite e acompanhe ideias com um layout limpo, rápido e conectado ao seu backend.
            </p>

            <div className="flex flex-wrap gap-3">
              {isAuthenticated ? (
                <>
                  <Button onClick={() => navigate("/dashboard")}>Ir para o Dashboard</Button>
                  <Button variant="outline" onClick={() => navigate("/ideas")}>
                    Ver ideias
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => navigate("/register")}>Criar conta</Button>
                  <Button variant="outline" onClick={() => navigate("/login")}>
                    Entrar
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Rápido e direto</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Interface limpa e sem “coisa jogada”. Você foca na ideia.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conectado ao backend</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Autenticação e CRUD integrados ao RedGit (8081) e IdeasHub (8082) via Context.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pronto pra crescer</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Dá pra adicionar tags, busca, favoritos, pin, upload e etc sem reescrever tudo.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
