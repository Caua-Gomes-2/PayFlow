import React from 'react';
import { CreditCard, Wallet, QrCode } from 'lucide-react';
import { PaymentMethod } from '../types/payment';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
}) => {
  const methods = [
    { id: 'pix' as PaymentMethod, label: 'PIX', icon: QrCode },
    { id: 'debit' as PaymentMethod, label: 'Cartão de Débito', icon: Wallet },
    { id: 'credit' as PaymentMethod, label: 'Cartão de Crédito', icon: CreditCard },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {methods.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onMethodSelect(id)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedMethod === id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};