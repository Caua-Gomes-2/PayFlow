import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePixString } from '../utils/pix';
import { Copy, Check } from 'lucide-react';
import { formatCurrency } from '../utils/payment';

interface PixQRCodeProps {
  amount: number;
  phoneNumber: string;
}

export const PixQRCode: React.FC<PixQRCodeProps> = ({ amount, phoneNumber }) => {
  const [copied, setCopied] = useState(false);
  const pixString = generatePixString(phoneNumber, amount);
  const formattedPhone = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenBankApp = () => {
    // Format PIX deep link
    const pixLink = `pix://qr/${encodeURIComponent(pixString)}`;
    window.location.href = pixLink;
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Pagamento PIX</h2>
        <p className="text-lg font-medium text-blue-600">
          {formatCurrency(amount)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <QRCodeSVG
          value={pixString}
          size={250}
          level="H"
          includeMargin={true}
          className="rounded-lg"
        />
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Chave PIX (Telefone)</p>
            <p className="text-lg font-medium text-gray-900">{formattedPhone}</p>
          </div>
          <button
            onClick={handleCopyKey}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleOpenBankApp}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Abrir App do Banco
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            1. Abra o app do seu banco
            <br />
            2. Escolha pagar via PIX com QR Code
            <br />
            3. Aponte a câmera para o código acima
          </p>
        </div>
      </div>
    </div>
  );
};