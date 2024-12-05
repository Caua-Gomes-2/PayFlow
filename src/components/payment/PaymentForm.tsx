import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, QrCode } from 'lucide-react';
import { PaymentMethod } from '../../types/payment';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CardPayment } from './CardPayment';
import { PixPayment } from './PixPayment';
import { AmountInput } from './AmountInput';

export const PaymentForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('pix');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const paymentMethods = [
    { id: 'pix' as PaymentMethod, label: 'PIX', icon: <QrCode className="w-6 h-6" /> },
    { id: 'debit' as PaymentMethod, label: 'Débito', icon: <Wallet className="w-6 h-6" /> },
    { id: 'credit' as PaymentMethod, label: 'Crédito', icon: <CreditCard className="w-6 h-6" /> },
  ];

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowPaymentForm(true);
  };

  return (
    <div className="space-y-6">
      {!showPaymentForm ? (
        <>
          <AmountInput
            value={amount}
            onChange={setAmount}
          />

          <PaymentMethodSelector
            methods={paymentMethods}
            selectedMethod={selectedMethod}
            onSelect={handleMethodSelect}
          />
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {selectedMethod === 'pix' ? (
              <PixPayment
                amount={amount}
                onBack={() => setShowPaymentForm(false)}
              />
            ) : (
              <CardPayment
                type={selectedMethod}
                amount={amount}
                onBack={() => setShowPaymentForm(false)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};