import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="page">
      {/* Topbar (estilo Figma) */}
      <header className="w-full border-b bg-white/70 backdrop-blur">
        <div className="container-app h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-blue-600 text-white font-bold">
              💡
            </div>
            <div className="font-semibold">Gerenciador de Ideias</div>
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  Registrar
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/dashboard")}
                className="h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container-app py-14">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Organize Suas Ideias de Forma <br className="hidden md:block" />
            Simples e Eficiente
          </h1>
          <p className="mt-5 text-slate-600 text-base md:text-lg">
            Um sistema moderno baseado em microserviços para gerenciar todas as suas ideias em um só lugar.
            Crie, edite e organize suas inspirações de maneira profissional.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
              className="h-11 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Começar Agora
            </button>

            <button
              onClick={() => navigate(isAuthenticated ? "/ideas" : "/login")}
              className="h-11 px-6 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium hover:bg-slate-50"
            >
              Já tenho conta
            </button>
          </div>
        </div>

        {/* Cards 4 colunas */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Gestão de Ideias", desc: "Crie, edite e organize suas ideias com título, descrição e metadados.", icon: "💡" },
            { title: "Autenticação JWT", desc: "Sistema seguro de autenticação com tokens JWT e controle de acesso.", icon: "🛡️" },
            { title: "Controle de Autoria", desc: "Apenas o autor pode editar ou excluir suas próprias ideias.", icon: "👥" },
            { title: "Microserviços", desc: "Arquitetura moderna com Spring Boot e serviços separados.", icon: "⚡" },
          ].map((c) => (
            <div key={c.title} className="card-soft p-6">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 grid place-items-center text-lg">{c.icon}</div>
              <h3 className="mt-4 font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Tecnologias */}
        <div className="mt-14 card-soft p-8">
          <h2 className="text-center font-semibold text-slate-900">Tecnologias Utilizadas</h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Frontend (React + Vite + Tailwind) • Auth (Spring Security + JWT) • IdeasHub (Spring Boot + MongoDB)
          </p>
        </div>
      </main>
    </div>
  );
}
