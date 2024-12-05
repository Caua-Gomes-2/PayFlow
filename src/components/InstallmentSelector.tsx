import React from 'react';
import { InstallmentOption } from '../types/payment';
import { formatCurrency, formatInstallmentOption } from '../utils/payment';

interface InstallmentSelectorProps {
  installments: InstallmentOption[];
  selectedInstallments: number;
  onInstallmentSelect: (installments: number) => void;
}

export const InstallmentSelector: React.FC<InstallmentSelectorProps> = ({
  installments,
  selectedInstallments,
  onInstallmentSelect,
}) => {
  if (installments.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Opções de Parcelamento</h3>
      <div className="space-y-2">
        {installments.map((option) => (
          <button
            key={option.numberOfInstallments}
            onClick={() => onInstallmentSelect(option.numberOfInstallments)}
            className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
              selectedInstallments === option.numberOfInstallments
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {formatInstallmentOption(option)}
              </span>
              <span className="text-gray-600">
                Total: {formatCurrency(option.totalAmount)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};