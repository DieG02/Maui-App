export const paymentsMethod: {
  [key: string]: {
    es: string;
    en: string;
  };
} = {
  CASH: {
    es: 'Efectivo',
    en: 'Cash',
  },
  CARD: {
    es: 'Tarjeta',
    en: 'Card',
  },
  BANK_TRANSFER: {
    es: 'Transferencia',
    en: 'Bank transfer',
  },
  OTHER: {
    es: 'Otro',
    en: 'Other',
  },
};
