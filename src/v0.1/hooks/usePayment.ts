import { paymentMethods, STATE } from "../utils/payment";

const usePayment = () => {
  const stateOptions = Object.values(STATE).map((state) => state.label);

  const paymentsOptions = Object.values(paymentMethods).map(
    (payment) => payment.es
  );

  const handleSelected = (value: boolean) =>
    Object.values(STATE).find((state) => state.value === value)?.label || "";

  const handleState = (value: string) => {
    const selected = Object.values(STATE).find((state) => state.label === value)
      ?.value as boolean;
    return selected;
  };

  const handlePayment = (value: string) => {
    const selected = Object.values(paymentMethods).find(
      (payment) => payment.es === value
    )?.en as string;
    return selected;
  };

  const handlePaymentName = (value: string) => {
    const selected = Object.values(paymentMethods).find(
      (payment) => payment.en === value
    )?.es as string;
    return selected;
  };

  return {
    stateOptions,
    paymentsOptions,
    handleState,
    handlePayment,
    handlePaymentName,
    handleSelected,
  };
};

export default usePayment;
