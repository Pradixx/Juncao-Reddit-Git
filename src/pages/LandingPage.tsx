import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <nav className="p-6 flex justify-between max-w-7xl mx-auto items-center">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Lightbulb className="text-blue-600" /> IdeasHub
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-blue-600 font-medium">Login</Link>
          <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded">Começar</button>
        </div>
      </nav>
      <header className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-6">Transforme suas ideias em realidade</h1>
        <p className="text-gray-600 text-xl max-w-2xl">Digitalize seus insights, colabore com segurança e gerencie seu fluxo criativo em um só lugar.</p>
      </header>
    </div>
  );
};
