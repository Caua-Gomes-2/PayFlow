import { InstallmentOption } from '../types/payment';

export const calculateInstallments = (totalAmount: number): InstallmentOption[] => {
  const FIXED_INSTALLMENT = 50; // Fixed installment value of R$ 50,00
  const MAX_INSTALLMENTS = 6; // Maximum of 6 installments

  const options: InstallmentOption[] = [];
  
  // Calculate maximum possible installments based on fixed value
  const maxPossibleInstallments = Math.min(
    Math.floor(totalAmount / FIXED_INSTALLMENT),
    MAX_INSTALLMENTS
  );

  // Generate installment options
  for (let i = 1; i <= maxPossibleInstallments; i++) {
    const installmentValue = Math.round((totalAmount / i) * 100) / 100;
    options.push({
      numberOfInstallments: i,
      installmentValue,
      totalAmount: totalAmount
    });
  }
  
  return options;
};

export const calculateExactInstallments = (totalAmount: number, maxInstallments: number): InstallmentOption[] => {
  const options: InstallmentOption[] = [];
  
  for (let i = 1; i <= maxInstallments; i++) {
    const rawValue = totalAmount / i;
    const installmentValue = Math.round(rawValue * 100) / 100;
    const actualTotal = installmentValue * i;
    
    if (actualTotal === totalAmount) {
      options.push({
        numberOfInstallments: i,
        installmentValue,
        totalAmount: actualTotal
      });
    }
  }
  
  return options;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatInstallmentOption = (option: InstallmentOption): string => {
  return `${option.numberOfInstallments}x de ${formatCurrency(option.installmentValue)}`;
};