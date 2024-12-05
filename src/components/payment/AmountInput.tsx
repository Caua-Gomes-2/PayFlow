import React from 'react';
import { motion } from 'framer-motion';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700">
        Valor do Pagamento
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
          R$
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-200 shadow-sm
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                   text-lg font-medium"
          required
        />
      </div>
    </motion.div>
  );
};