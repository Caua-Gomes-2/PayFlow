import React, { useState } from 'react';
import { CardDetails, CardValidationResult } from '../types/card';
import { validateLuhn, validateExpiryDate, validateCard, formatCardNumber, formatExpiryDate } from '../utils/cardValidation';
import { CreditCard, Calendar, User } from 'lucide-react';

interface CardRegistrationFormProps {
  type: 'credit' | 'debit';
  onSubmit: (cardDetails: CardDetails) => void;
  onCancel: () => void;
}

export const CardRegistrationForm: React.FC<CardRegistrationFormProps> = ({
  type,
  onSubmit,
  onCancel,
}) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CardDetails, string>>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Partial<Record<keyof CardDetails, string>> = {};

    if (!validateLuhn(cardDetails.number)) {
      newErrors.number = 'Número de cartão inválido';
    }

    if (!validateExpiryDate(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Data de expiração inválida';
    }

    if (cardDetails.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }

    if (cardDetails.holderName.trim().length < 3) {
      newErrors.holderName = 'Nome inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);

    try {
      const isValid = await validateForm();
      if (isValid) {
        const isCardActive = await validateCard(cardDetails.number);
        if (isCardActive) {
          onSubmit(cardDetails);
        } else {
          setErrors({ number: 'Cartão não está ativo' });
        }
      }
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        Cadastro de Cartão {type === 'credit' ? 'de Crédito' : 'de Débito'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número do Cartão
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            maxLength={19}
            value={cardDetails.number}
            onChange={(e) => setCardDetails({
              ...cardDetails,
              number: formatCardNumber(e.target.value),
            })}
            className="pl-10 pr-3 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        {errors.number && (
          <p className="mt-1 text-sm text-red-600">{errors.number}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de Expiração
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              maxLength={5}
              value={cardDetails.expiryDate}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                expiryDate: formatExpiryDate(e.target.value),
              })}
              className="pl-10 pr-3 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="MM/AA"
            />
          </div>
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            maxLength={4}
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({
              ...cardDetails,
              cvv: e.target.value.replace(/\D/g, ''),
            })}
            className="pl-3 pr-3 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="123"
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Titular
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={cardDetails.holderName}
            onChange={(e) => setCardDetails({
              ...cardDetails,
              holderName: e.target.value.toUpperCase(),
            })}
            className="pl-10 pr-3 py-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="NOME COMO ESTÁ NO CARTÃO"
          />
        </div>
        {errors.holderName && (
          <p className="mt-1 text-sm text-red-600">{errors.holderName}</p>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isValidating}
          className="flex-1 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isValidating ? 'Validando...' : 'Confirmar'}
        </button>
      </div>
    </form>
  );
};