import React from 'react';
import { motion } from 'framer-motion';
import { InstallmentOption as IInstallmentOption } from '../../types/payment';
import { formatCurrency } from '../../utils/payment';

interface InstallmentOptionProps {
  option: IInstallmentOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const InstallmentOption: React.FC<InstallmentOptionProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg transition-all
        ${isSelected 
          ? 'bg-primary-50 border-2 border-primary-500' 
          : 'bg-white border-2 border-gray-100 hover:border-primary-100'}
      `}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className={`
            font-semibold
            ${isSelected ? 'text-primary-700' : 'text-gray-900'}
          `}>
            {option.numberOfInstallments}x de {formatCurrency(option.installmentValue)}
          </span>
          <span className="text-sm text-gray-500">
            Sem juros
          </span>
        </div>
        <span className={`
          text-sm
          ${isSelected ? 'text-primary-600' : 'text-gray-500'}
        `}>
          Total: {formatCurrency(option.totalAmount)}
        </span>
      </div>
    </motion.button>
  );
};