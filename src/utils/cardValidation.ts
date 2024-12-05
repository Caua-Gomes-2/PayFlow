export const validateLuhn = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const [month, year] = expiryDate.split('/').map(num => parseInt(num));
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return (
    year > currentYear || (year === currentYear && month >= currentMonth)
  );
};

export const validateCard = async (cardNumber: string): Promise<boolean> => {
  // Simulate API call to check if card is active
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

export const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};