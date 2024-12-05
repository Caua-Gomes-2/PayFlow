import CryptoJS from 'crypto-js';
import { CardDetails } from '../types/card';

const ENCRYPTION_KEY = 'your-secure-key-here';

export const encryptCardData = (cardData: CardDetails): CardDetails => {
  const encryptField = (value: string) => {
    return CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  };

  return {
    ...cardData,
    number: encryptField(cardData.number),
    holderName: encryptField(cardData.holderName),
    expiryDate: encryptField(cardData.expiryDate),
    cvv: encryptField(cardData.cvv),
  };
};