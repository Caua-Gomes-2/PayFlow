import React from 'react';
import { format } from 'date-fns';
import { formatCurrency } from '../../../utils/payment';

interface Transaction {
  id: string;
  date: Date;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: 'credit' | 'debit' | 'pix';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date(),
    customer: 'John Doe',
    amount: 1250.00,
    status: 'completed',
    method: 'credit',
  },
  {
    id: '2',
    date: new Date(),
    customer: 'Jane Smith',
    amount: 850.50,
    status: 'pending',
    method: 'pix',
  },
  {
    id: '3',
    date: new Date(),
    customer: 'Bob Johnson',
    amount: 450.75,
    status: 'completed',
    method: 'debit',
  },
];

export const RecentTransactions: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(transaction.date, 'dd/MM/yyyy HH:mm')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {transaction.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  transaction.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};