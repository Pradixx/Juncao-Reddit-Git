import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  type?: '404' | '403';
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ type = '404' }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AlertTriangle className="w-20 h-20 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold">{type === '403' ? '403 - Sem Permissão' : '404 - Não Encontrada'}</h1>
      <button onClick={() => navigate('/dashboard')} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">Voltar ao Início</button>
    </div>
  );
};
