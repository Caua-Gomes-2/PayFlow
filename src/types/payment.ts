export type PaymentMethod = 'pix' | 'debit' | 'credit';

export interface InstallmentOption {
  numberOfInstallments: number;
  installmentValue: number;
  totalAmount: number;
}

export interface PaymentFormData {
  amount: number;
  method: PaymentMethod;
  installments?: number;
}