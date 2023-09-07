import { View } from 'react-native';
import InputForm from '../../../components/common/InputForm';
import Button from '../Button';
import customStyles from '../../../styles/customStyles';
import InputDate from '../../../components/common/InputDate';
import OptionModal from '../../../components/common/OptionModal';
import useForm from '../../../hooks/useForm';
import moment from 'moment';
import usePayment from '../../../hooks/usePayment';
import useToggle from '../../../hooks/useToggle';
import usePayIncomeDebt from '../../../services/Incomes/usePayIncomeDebt';
import usePayExpenseDebt from '../../../services/Expenses/usePayExpenseDebt';
import { paymentMethods } from '../../../utils/payment';
import { showToast } from '../../../utils/toast';
import { useTranslation } from 'react-i18next';

interface Props {
  amount: string;
  id: string;
  type: 'income' | 'expense';
}

const { mainColor, income, white } = customStyles;
const TODAY = moment.parseZone().toISOString();

const RepayModal = ({ amount, id, type }: Props) => {
  const { t } = useTranslation();
  const { value, toggle } = useToggle(false);
  const { values, setValues, validateValues } = useForm<Payments>({
    amount,
    paidAt: TODAY,
    id,
    paymentMethod: paymentMethods['CASH'].es,
  });
  const { handlePayment, paymentsOptions } = usePayment();
  const { mutate } = usePayIncomeDebt(id);
  const { mutate: expMutate } = usePayExpenseDebt(id);

  const handleSubmit = () => {
    if (
      Number((values.amount as string).replace(/\./g, '').replace(',', '.')) >
      Number(amount.replace(/\./g, '').replace(',', '.'))
    ) {
      return showToast(`${t('debt_stack.replay_modal.toast_amount')} ${amount}`);
    }
    const toValidate = Object.keys(values);
    if (validateValues(toValidate)) {
      const valueToMutate = {
        ...values,
        paymentMethod: handlePayment(values.paymentMethod),
        paidAt: values.paidAt,
        amount: parseFloat((values.amount as string).replace(/\./g, '').replace(',', '.')),
      };
      type === 'income' ? mutate(valueToMutate) : expMutate(valueToMutate);
    }
  };
  return (
    <View
      style={{
        backgroundColor: white,
        padding: 20,
        borderRadius: 15,
      }}
    >
      <InputForm
        keyboardType='numeric'
        placeholder='0,00'
        value={values.amount as string}
        name={t('debt_stack.replay_modal.value')}
        setValue={val => {
          const newValue = !!val && val !== 'NaN' ? val : '';
          setValues(prev => ({ ...prev, amount: newValue }));
        }}
        marginBottom={20}
        marginTop={15}
        required
      />
      <OptionModal
        title={t('debt_stack.replay_modal.payment_method')}
        options={paymentsOptions}
        isModalVisible={value}
        setIsModalVisible={toggle}
        selectedOption={t(values.paymentMethod)}
        setSelectedOption={text =>
          setValues(prev => ({
            ...prev,
            paymentMethod: text,
          }))
        }
      />
      <InputDate
        name={t('debt_stack.replay_modal.date')}
        date={values.paidAt as string}
        setDate={date => setValues(prev => ({ ...prev, paidAt: date }))}
        color={income}
      />
      <Button
        text={t('debt_stack.replay_modal.create_credit')}
        onPress={handleSubmit}
        style={{
          backgroundColor: mainColor,
          marginTop: 25,
        }}
      />
    </View>
  );
};

export default RepayModal;
