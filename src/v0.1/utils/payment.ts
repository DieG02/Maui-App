type PaymentMethods = {
  [key in PaymentMethod]: { es: string; en: PaymentMethod };
};

enum State {
  PAGADO = 'PAGADO',
  DEUDA = 'DEUDA',
}

type StatePayment = {
  [key in State]: { value: boolean; label: string };
};

export const paymentMethods: PaymentMethods = {
  CASH: {
    es: 'balance_stack.payment_method_options.cash',
    en: 'CASH',
  },
  CARD: {
    es: 'balance_stack.payment_method_options.card',
    en: 'CARD',
  },
  BANK_TRANSFER: {
    es: 'balance_stack.payment_method_options.bank_transfer',
    en: 'BANK_TRANSFER',
  },
  OTHER: {
    es: 'balance_stack.payment_method_options.other',
    en: 'OTHER',
  },
};

export const STATE: StatePayment = {
  PAGADO: {
    value: true,
    label: 'balance_stack.state_options.paid',
  },
  DEUDA: {
    value: false,
    label: 'balance_stack.state_options.debt',
  },
};
