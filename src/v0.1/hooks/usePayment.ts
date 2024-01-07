import { t } from 'i18next';
import { paymentMethods, STATE } from '../utils/payment';

const usePayment = () => {
  const stateOptions = Object.values(STATE).map(state => t(state.label));

  const paymentsOptionsLabels = Object.values(paymentMethods).map(state => t(state.label));

  const paymentsOptions = Object.values(paymentMethods).map(item => item);

  const handleSelected = (value: boolean) => {
    const selected = Object.values(STATE).find(state => state.value === value)?.label || '';
    return selected ? t(selected) : '';
  };

  const handleState = (value: string) => {
    const selected = Object.values(STATE).find(state => t(state.label) === value)?.value as boolean;
    return selected;
  };

  const handlePayment = (value: string) => {
    const selected = Object.values(paymentMethods).find(state => state.value === value)?.label || '';
    return selected ? t(selected) : '';
  };

  const handlePaymentName = (value: string) => {
    const selected = Object.values(paymentMethods).find(state => t(state.label) === value)?.value as string;
    return selected;
  };

  return {
    stateOptions,
    paymentsOptionsLabels,
    paymentsOptions,
    handleState,
    handlePayment,
    handlePaymentName,
    handleSelected,
  };
};

export default usePayment;
