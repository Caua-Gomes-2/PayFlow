import React, { useState, useEffect } from 'react';
import { PaymentMethod, PaymentFormData, InstallmentOption } from '../types/payment';
import { CardDetails } from '../types/card';
import { calculateInstallments, formatCurrency } from '../utils/payment';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { InstallmentSelector } from './InstallmentSelector';
import { PixQRCode } from './PixQRCode';
import { CardRegistrationForm } from './CardRegistrationForm';

export const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    method: 'pix',
  });
  const [installments, setInstallments] = useState<InstallmentOption[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPixQR, setShowPixQR] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  useEffect(() => {
    if (formData.method === 'credit' && formData.amount > 0) {
      setInstallments(calculateInstallments(formData.amount));
    } else {
      setInstallments([]);
    }
  }, [formData.amount, formData.method]);

  const handleCardSubmit = async (cardDetails: CardDetails) => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowCardForm(false);
    setSuccess(true);
    setIsProcessing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.method === 'pix') {
      setShowPixQR(true);
      return;
    }

    setShowCardForm(true);
  };

  if (showPixQR) {
    return (
      <div className="space-y-6">
        <PixQRCode amount={formData.amount} phoneNumber="11982236609" />
        <button
          onClick={() => setShowPixQR(false)}
          className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (showCardForm) {
    return (
      <CardRegistrationForm
        type={formData.method as 'credit' | 'debit'}
        onSubmit={handleCardSubmit}
        onCancel={() => setShowCardForm(false)}
      />
    );
  }

  if (success) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <div className="text-green-500 text-2xl mb-4">✓</div>
        <h2 className="text-xl font-semibold mb-2">Pagamento Confirmado!</h2>
        <p className="text-gray-600">
          Sua transação foi processada com sucesso.
        </p>
        <a
          href={`${window.location.origin}/payment-status`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          Acompanhar pedido →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor do Pagamento
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            R$
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.amount || ''}
            onChange={(e) =>
              setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
            }
            className="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Método de Pagamento
        </label>
        <PaymentMethodSelector
          selectedMethod={formData.method}
          onMethodSelect={(method) => setFormData({ ...formData, method })}
        />
      </div>

      {formData.method === 'credit' && installments.length > 0 && (
        <InstallmentSelector
          installments={installments}
          selectedInstallments={formData.installments || 1}
          onInstallmentSelect={(installments) =>
            setFormData({ ...formData, installments })
          }
        />
      )}

      <button
        type="submit"
        disabled={isProcessing || formData.amount <= 0}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processando...' : 'Continuar'}
      </button>
    </form>
  );
};