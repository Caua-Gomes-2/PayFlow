export const generatePixString = (phoneNumber: string, amount: number): string => {
  // Merchant information
  const merchantName = 'EMPRESA LTDA';
  const merchantCity = 'SAO PAULO';
  const description = `Pagamento ${amount.toFixed(2)}`;
  
  // Format key (remove non-digits from phone number)
  const pixKey = phoneNumber.replace(/\D/g, '');
  
  // Build payload following BR Code specification
  const payload = [
    '00', // Payload format indicator
    '01', // Fixed value
    '26', // Merchant account information
    '00', // GUI
    '01', // Fixed value
    '12', // Fixed value
    '04', // Fixed value (phone type)
    pixKey.length.toString().padStart(2, '0'),
    pixKey,
    '52', // Merchant category code
    '04', // Fixed value
    '00', // Transaction currency
    '53', // Transaction amount
    '03', // Fixed value
    '986', // BRL currency code
    '54', // Transaction amount
    amount.toFixed(2).length.toString().padStart(2, '0'),
    amount.toFixed(2),
    '58', // Country code
    '02', // Fixed value
    'BR', // Brazil
    '59', // Merchant name
    merchantName.length.toString().padStart(2, '0'),
    merchantName,
    '60', // Merchant city
    merchantCity.length.toString().padStart(2, '0'),
    merchantCity,
    '62', // Additional data field
    '50', // Fixed value
    description.length.toString().padStart(2, '0'),
    description,
  ].join('');

  // Add CRC16 at the end (simulated here)
  return payload + '6304' + 'ABCD'; // In production, calculate actual CRC16
};

export const generatePixDeepLink = (pixString: string): string => {
  return `pix://qr/${encodeURIComponent(pixString)}`;
};