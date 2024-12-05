import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaymentMethod } from '../../types/payment';
import { CardForm } from './CardForm';
import { InstallmentSelector } from './InstallmentSelector';
import { calculateInstallments } from '../../utils/payment';
import { CardDetails } from '../../types/card';

interface CardPaymentProps {
  type: 'credit' | 'debit';
  amount: number;
  onBack: () => void;
}

export const CardPayment: React.FC<CardPaymentProps> = ({
  type,
  amount,
  onBack,
}) => {
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const installments = type === 'credit' ? calculateInstallments(amount) : [];

  const handleCardSubmit = async (cardData: CardDetails) => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-success-50 rounded-xl"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-500 text-white flex items-center justify-center">
          ✓
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Pagamento Confirmado!
        </h2>
        <p className="text-gray-600">
          Sua transação foi processada com sucesso.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <CardForm
        type={type}
        onSubmit={handleCardSubmit}
        onCancel={onBack}
      />

      {type === 'credit' && installments.length > 0 && (
        <InstallmentSelector
          installments={installments}
          selectedInstallment={selectedInstallment}
          onSelect={setSelectedInstallment}
        />
      )}
    </div>
  );
};