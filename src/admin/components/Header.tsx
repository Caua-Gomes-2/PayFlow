import React from 'react';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import { User as UserType } from '../types/auth';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">PayFlow Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="w-5 h-5" />
            </button>
            <div className="relative">
              <button className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:text-gray-900">
                <User className="w-5 h-5" />
                <span>{user.name}</span>
              </button>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 p-2 text-sm text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};