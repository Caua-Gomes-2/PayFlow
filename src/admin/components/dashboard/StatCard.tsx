import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendDirection: 'up' | 'down';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendDirection,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-primary-50">
          <div className="text-primary-600">{icon}</div>
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          trendDirection === 'up' ? 'text-success-600' : 'text-red-600'
        }`}>
          {trendDirection === 'up' ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )}
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};