import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { CardDetails } from '../../types/card';
import { validateCard, validateLuhn, formatCardNumber, formatExpiryDate } from '../../utils/cardValidation';
import { encryptCardData } from '../../utils/encryption';
import { Button } from '../ui/Button';
import { CreditCard, Calendar, User, KeyRound } from 'lucide-react';

interface CardFormProps {
  onSubmit: (cardData: CardDetails) => void;
  onCancel: () => void;
  type: 'credit' | 'debit';
}

export const CardForm: React.FC<CardFormProps> = ({ onSubmit, onCancel, type }) => {
  const [cardData, setCardData] = useState<CardDetails>({
    number: '',
    holderName: '',
    expiryDate: '',
    cvv: '',
    focused: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CardDetails, string>>>({});
  const [isValidating, setIsValidating] = useState(false);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      focused: e.target.name,
    });
  };

  const validateForm = async () => {
    const newErrors: Partial<Record<keyof CardDetails, string>> = {};

    if (!validateLuhn(cardData.number)) {
      newErrors.number = 'Número de cartão inválido';
    }

    if (cardData.holderName.length < 3) {
      newErrors.holderName = 'Nome inválido';
    }

    if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Data inválida';
    }

    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'CVV inválido';
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
        const isCardValid = await validateCard(cardData.number);
        if (isCardValid) {
          const encryptedData = encryptCardData(cardData);
          onSubmit(encryptedData);
        } else {
          setErrors({ ...errors, number: 'Cartão não autorizado' });
        }
      }
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-center mb-6">
        <Cards
          number={cardData.number}
          expiry={cardData.expiryDate}
          cvc={cardData.cvv}
          name={cardData.holderName}
          focused={cardData.focused as any}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número do Cartão
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="number"
              maxLength={19}
              value={cardData.number}
              onChange={(e) => setCardData({
                ...cardData,
                number: formatCardNumber(e.target.value),
              })}
              onFocus={handleInputFocus}
              className="pl-10 pr-3 py-2 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          {errors.number && (
            <p className="mt-1 text-sm text-red-600">{errors.number}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Titular
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="holderName"
              value={cardData.holderName}
              onChange={(e) => setCardData({
                ...cardData,
                holderName: e.target.value.toUpperCase(),
              })}
              onFocus={handleInputFocus}
              className="pl-10 pr-3 py-2 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="NOME COMO ESTÁ NO CARTÃO"
            />
          </div>
          {errors.holderName && (
            <p className="mt-1 text-sm text-red-600">{errors.holderName}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validade
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="expiry"
                maxLength={5}
                value={cardData.expiryDate}
                onChange={(e) => setCardData({
                  ...cardData,
                  expiryDate: formatExpiryDate(e.target.value),
                })}
                onFocus={handleInputFocus}
                className="pl-10 pr-3 py-2 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
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
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="cvc"
                maxLength={4}
                value={cardData.cvv}
                onChange={(e) => setCardData({
                  ...cardData,
                  cvv: e.target.value.replace(/\D/g, ''),
                })}
                onFocus={handleInputFocus}
                className="pl-10 pr-3 py-2 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="123"
              />
            </div>
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isValidating}
            className="flex-1"
          >
            Confirmar
          </Button>
        </div>
      </form>
    </motion.div>
  );
};