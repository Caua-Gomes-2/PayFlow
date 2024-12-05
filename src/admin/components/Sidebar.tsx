import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Activity,
  FileText,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/admin/transactions', icon: CreditCard, label: 'Transactions' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/reports', icon: FileText, label: 'Reports' },
  { to: '/admin/activity', icon: Activity, label: 'Activity Log' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};