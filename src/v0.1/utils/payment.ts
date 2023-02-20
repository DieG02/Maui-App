import { PaymentMethod } from "../../../../Maui-Backend/node_modules/@prisma/client";

type PaymentMethods = {
  [key in PaymentMethod]: { es: string; en: PaymentMethod };
};

enum State {
  PAGADO = "PAGADO",
  DEUDA = "DEUDA",
}

type StatePayment = {
  [key in State]: { value: boolean; label: string };
};

export const paymentMethods: PaymentMethods = {
  CASH: {
    es: "EFECTIVO",
    en: "CASH",
  },
  CARD: {
    es: "TARJETA",
    en: "CARD",
  },
  BANK_TRANSFER: {
    es: "TRANSFERENCIA",
    en: "BANK_TRANSFER",
  },
  OTHER: {
    es: "OTRO",
    en: "OTHER",
  },
};

export const STATE: StatePayment = {
  PAGADO: {
    value: true,
    label: "Pagado",
  },
  DEUDA: {
    value: false,
    label: "Deuda",
  },
};
