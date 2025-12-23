import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useIdeas } from "../contexts/IdeasContext";
import { AlertCircle, Save } from "lucide-react";

export default function CreateIdeaPage() {
  const { createIdea } = useIdeas();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const ok = await createIdea({ title, description });
    setLoading(false);

    if (ok) navigate("/ideas");
    else setError("Erro ao criar ideia.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Criar nova ideia</h1>
          <p className="mt-1 text-sm text-gray-600">Dê um título claro e descreva o suficiente para lembrar depois.</p>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Título</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Ideia para app de tarefas"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                className="mt-1 min-h-[140px] w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o problema, solução, público..."
                required
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-md border bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
