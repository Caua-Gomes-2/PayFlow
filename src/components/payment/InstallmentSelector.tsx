import React from 'react';
import { motion } from 'framer-motion';
import { InstallmentOption } from '../../types/payment';
import { formatCurrency } from '../../utils/payment';

interface InstallmentSelectorProps {
  installments: InstallmentOption[];
  selectedInstallment: number;
  onSelect: (installments: number) => void;
}

export const InstallmentSelector: React.FC<InstallmentSelectorProps> = ({
  installments,
  selectedInstallment,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Opções de Parcelamento
      </h3>
      <div className="space-y-2">
        {installments.map((option) => (
          <motion.button
            key={option.numberOfInstallments}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(option.numberOfInstallments)}
            className={`
              w-full p-4 rounded-lg transition-all
              ${selectedInstallment === option.numberOfInstallments
                ? 'bg-primary-50 border-2 border-primary-500'
                : 'bg-white border-2 border-gray-100 hover:border-primary-100'}
            `}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className={`
                  font-semibold
                  ${selectedInstallment === option.numberOfInstallments
                    ? 'text-primary-700'
                    : 'text-gray-900'}
                `}>
                  {option.numberOfInstallments}x de {formatCurrency(option.installmentValue)}
                </span>
                <span className="text-sm text-gray-500">
                  Sem juros
                </span>
              </div>
              <span className={`
                text-sm
                ${selectedInstallment === option.numberOfInstallments
                  ? 'text-primary-600'
                  : 'text-gray-500'}
              `}>
                Total: {formatCurrency(option.totalAmount)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};