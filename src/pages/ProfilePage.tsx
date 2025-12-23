import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useIdeas } from '../contexts/IdeasContext';
import { User } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { getUserIdeas } = useIdeas();
  const ideas = getUserIdeas();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl w-full">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-600"/>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-400">Total de Ideias Criadas</p>
          <p className="text-3xl font-bold">{ideas.length}</p>
        </div>
      </div>
    </div>
  );
};
