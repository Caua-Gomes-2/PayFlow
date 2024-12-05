import React from 'react';
import { motion } from 'framer-motion';
import { PaymentMethod } from '../../types/payment';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  icon,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full p-4 rounded-xl transition-all
        ${isSelected 
          ? 'bg-primary-50 border-2 border-primary-500 shadow-md' 
          : 'bg-white border-2 border-gray-100 hover:border-primary-100'}
      `}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`
          p-3 rounded-full
          ${isSelected ? 'bg-primary-100 text-primary-600' : 'bg-gray-50 text-gray-600'}
        `}>
          {icon}
        </div>
        <span className={`
          font-medium text-sm
          ${isSelected ? 'text-primary-700' : 'text-gray-700'}
        `}>
          {label}
        </span>
      </div>
    </motion.button>
  );
};