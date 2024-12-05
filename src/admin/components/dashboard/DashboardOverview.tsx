import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { StatCard } from './StatCard';
import { SalesChart } from './SalesChart';
import { RecentTransactions } from './RecentTransactions';
import { formatCurrency } from '../../../utils/payment';

export const DashboardOverview: React.FC = () => {
  // Mock data - In a real app, this would come from an API
  const stats = {
    dailySales: 15780.50,
    monthlyRevenue: 157890.75,
    totalCustomers: 1234,
    pendingOrders: 23,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Daily Sales"
            value={formatCurrency(stats.dailySales)}
            icon={<DollarSign className="w-6 h-6" />}
            trend="+12.5%"
            trendDirection="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(stats.monthlyRevenue)}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="+8.2%"
            trendDirection="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toString()}
            icon={<Users className="w-6 h-6" />}
            trend="+5.3%"
            trendDirection="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders.toString()}
            icon={<ShoppingCart className="w-6 h-6" />}
            trend="-2.1%"
            trendDirection="down"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <SalesChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <RecentTransactions />
        </motion.div>
      </div>
    </div>
  );
};