type PaymentMethods = {
  [key in PaymentMethod]: { value: string; label: string };
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
    label: 'balance_stack.payment_method_options.cash',
    value: 'CASH',
  },
  CARD: {
    label: 'balance_stack.payment_method_options.card',
    value: 'CARD',
  },
  BANK_TRANSFER: {
    label: 'balance_stack.payment_method_options.bank_transfer',
    value: 'BANK_TRANSFER',
  },
  OTHER: {
    label: 'balance_stack.payment_method_options.other',
    value: 'OTHER',
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
