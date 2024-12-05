import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { generatePixString } from '../../utils/pix';
import { formatCurrency } from '../../utils/payment';

interface PixPaymentProps {
  amount: number;
  onBack: () => void;
}

export const PixPayment: React.FC<PixPaymentProps> = ({ amount, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed'>('pending');
  
  const pixString = generatePixString('11982236609', amount);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate payment confirmation after random time
    const confirmationTimer = setTimeout(() => {
      setPaymentStatus('confirmed');
    }, Math.random() * 10000 + 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(confirmationTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (paymentStatus === 'confirmed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-success-500 text-white flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Pagamento Confirmado!</h2>
        <p className="text-gray-600">
          Recebemos seu pagamento de {formatCurrency(amount)}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          Voltar
        </Button>
        <div className="text-sm font-medium text-gray-500">
          Expira em: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Pagamento PIX</h2>
        <p className="text-2xl font-bold text-primary-600">
          {formatCurrency(amount)}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <QRCodeSVG
            value={pixString}
            size={200}
            level="H"
            includeMargin
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Código PIX</p>
              <p className="font-medium text-gray-900 mt-1">
                {pixString.slice(0, 20)}...
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPixCode}
              icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
        </div>

        <div className="bg-primary-50 p-4 rounded-lg">
          <h3 className="font-medium text-primary-900 mb-2">Como pagar?</h3>
          <ol className="text-sm text-primary-700 space-y-2">
            <li>1. Abra o app do seu banco</li>
            <li>2. Escolha pagar via PIX com QR Code</li>
            <li>3. Aponte a câmera para o código acima</li>
            <li>4. Confirme o pagamento</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
};