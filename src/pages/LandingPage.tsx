import { Link } from "react-router-dom";
import { Lightbulb, Sparkles, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Lightbulb className="h-5 w-5 text-indigo-600" />
            <span>IdeasHub</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Entrar
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Começar
            </Link>
          </div>
        </header>

        <main className="py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Transforme ideias em entregas.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Crie, organize e evolua suas ideias com um fluxo simples. Login rápido, rotas protegidas e integração com
                seus microserviços.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Criar conta
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Já tenho conta
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <Feature icon={<Zap className="h-5 w-5 text-indigo-600" />} title="Rápido" text="Vite + SPA" />
                <Feature icon={<Shield className="h-5 w-5 text-indigo-600" />} title="Seguro" text="JWT + rotas" />
                <Feature icon={<Sparkles className="h-5 w-5 text-indigo-600" />} title="Organizado" text="CRUD completo" />
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <div className="h-10 w-2/3 rounded-lg bg-gray-100" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
                <div className="h-4 w-4/6 rounded bg-gray-100" />
                <div className="mt-6 grid gap-3">
                  <div className="rounded-xl border p-4">
                    <p className="text-sm font-semibold">Ideia: “App de organização”</p>
                    <p className="mt-1 text-sm text-gray-600">Criar backlog + tags + busca...</p>
                  </div>
                  <div className="rounded-xl border p-4">
                    <p className="text-sm font-semibold">Ideia: “Sistema de metas”</p>
                    <p className="mt-1 text-sm text-gray-600">Métricas semanais e relatórios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} IdeasHub • feito pra rodar liso com seu back
        </footer>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold text-gray-900">{title}</p>
      </div>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
    </div>
  );
}
