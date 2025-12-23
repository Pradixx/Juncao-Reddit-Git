import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

type Props = {
  type?: "404" | "403";
};

export default function ErrorPage({ type = "404" }: Props) {
  const navigate = useNavigate();
  const is403 = type === "403";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mx-auto max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>{is403 ? "Acesso negado" : "Página não encontrada"}</CardTitle>
              <CardDescription>
                {is403 ? "Você não tem permissão para acessar essa rota." : "Essa rota não existe."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Início
              </Button>
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
