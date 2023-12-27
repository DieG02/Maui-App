import CashIcon from 'react-native-vector-icons/FontAwesome5';
import CardIcon from 'react-native-vector-icons/Ionicons';
import TransferIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OtherIcon from 'react-native-vector-icons/FontAwesome5';

enum State {
  PAGADO = 'PAGADO',
  DEUDA = 'DEUDA',
}

type StatePayment = {
  [key in State]: { value: boolean; label: string };
};

type PaymentMethods = {
  [key in PaymentMethod]: {
    value: string;
    label: string;
    icon: React.ComponentType<any>;
    iconName: string;
  };
};

export const paymentMethods: PaymentMethods = {
  CASH: {
    label: 'balance_stack.payment_method_options.cash',
    value: 'CASH',
    iconName: 'money-bill',
    icon: CashIcon,
  },
  CARD: {
    label: 'balance_stack.payment_method_options.card',
    value: 'CARD',
    iconName: 'card',
    icon: CardIcon,
  },
  BANK_TRANSFER: {
    label: 'balance_stack.payment_method_options.bank_transfer',
    value: 'BANK_TRANSFER',
    iconName: 'bank-transfer',
    icon: TransferIcon,
  },
  OTHER: {
    label: 'balance_stack.payment_method_options.other',
    value: 'OTHER',
    iconName: 'wallet',
    icon: OtherIcon,
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
