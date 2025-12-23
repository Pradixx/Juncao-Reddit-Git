import { useNavigate } from "react-router-dom";
import { FileQuestion, Lock, Home } from "lucide-react";

export default function ErrorPage({ type = "404" }: { type?: "404" | "403" }) {
  const navigate = useNavigate();
  const is403 = type === "403";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
            {is403 ? <Lock className="h-8 w-8 text-red-600" /> : <FileQuestion className="h-8 w-8 text-indigo-600" />}
          </div>

          <h1 className="text-4xl font-bold text-gray-900">{type}</h1>
          <p className="mt-2 text-sm text-gray-600">{is403 ? "Acesso negado." : "Página não encontrada."}</p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
