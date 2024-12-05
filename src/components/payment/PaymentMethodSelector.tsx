import React from 'react';
import { motion } from 'framer-motion';
import { PaymentMethod } from '../../types/payment';
import { PaymentMethodCard } from './PaymentMethodCard';

interface PaymentMethodSelectorProps {
  methods: Array<{
    id: PaymentMethod;
    label: string;
    icon: React.ReactNode;
  }>;
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  methods,
  selectedMethod,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Método de Pagamento
      </h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-3 gap-4"
      >
        {methods.map(({ id, label, icon }) => (
          <PaymentMethodCard
            key={id}
            method={id}
            label={label}
            icon={icon}
            isSelected={selectedMethod === id}
            onClick={() => onSelect(id)}
          />
        ))}
      </motion.div>
    </div>
  );
};