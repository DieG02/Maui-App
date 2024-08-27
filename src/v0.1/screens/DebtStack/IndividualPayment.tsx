import { NavigationProp, RouteProp } from '@react-navigation/native';
import moment from 'moment';
import 'moment-timezone';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/common/Button';
import CommonInput from '../../components/common/CommonInput';
import DatePicker from '../../components/common/DatePicker';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import InputForm from '../../components/common/InputForm';
import PaymentMethodPicker from '../../components/common/PaymentMethodPicker';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import Form from '../../components/Library/Form';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import { GET_BALANCE_KEY } from '../../services/Balance/useGetBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useGetStats';
import { GET_DEBTS_KEY } from '../../services/Debts/useGetAllDebts';
import useGetDebtById, { GET_DEBT_KEY } from '../../services/Debts/useGetDebtsById';
import usePayDebtById from '../../services/Debts/usePayDebtById';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import customStyles from '../../styles/customStyles';
import { IPaymentMethod } from '../../types/types';
import { paymentMethods } from '../../utils/payment';
import { queryClient } from '../../utils/queryClient';

const { marginHorizontal, mainColor, background2, white } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const TODAY = moment.parseZone().toISOString();

const initialValues: InitialDebt = {
  value: '',
  description: '',
  paymentMethod: paymentMethods['CASH'].value,
  date: TODAY,
};

const validateOption = ['value'];

const IndividualPayment = ({ navigation, route }: Props) => {
  const { params } = route;
  const { t } = useTranslation();

  const { values, setValues, validateValues } = useForm<InitialDebt>(initialValues);

  const { newPaymentsOptions } = usePayment();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('debt_stack.payment_done'),
      position: 'bottom',
      visibilityTime: 1000,
    });
  };

  const { data: debtor, isLoading: loading } = useGetDebtById(params?.contact);

  const equalToDebt = Number(values.value) === debtor?.status.totalToPay;

  const { mutateAsync, isLoading } = usePayDebtById(
    {
      type: params?.type,
      paymentAmount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      paidAt: values.date,
      payment_method: values.paymentMethod as IPaymentMethod,
      description:
        values.description !== '' ? values.description : `${t('balance_stack.payment')} ${moment.parseZone().unix()}`,
    },
    params?.debtId as string,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_DEBTS_KEY);
        queryClient.invalidateQueries(GET_DEBT_KEY, params?.contact);
        queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
        queryClient.invalidateQueries(GET_BALANCE_KEY);
        queryClient.invalidateQueries(GET_MONTHLY_STATS_KEY);
        if (equalToDebt) {
          navigation.navigate('HomeTabs', { screen: 'Debts' });
        } else {
          navigation.navigate('DebtorScreen', {
            contactId: params?.contact,
          });
        }
        showToast();
      },
      onError: () => {
        Alert.alert('Error', 'No se pudo realizar el pago');
      },
    }
  );

  const handleSubmit = () => {
    mutateAsync();
  };

  if (isLoading || loading) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <BackHeaderTitle label={t('debt_stack.new_payment')} onPressBack={() => navigation.goBack()} />
      <Form>
        <DatePicker
          name={t('balance_stack.new_income.date')}
          value={values.date}
          setValue={date => setValues(prev => ({ ...prev, date: date }))}
        />
        <InputForm
          keyboardType='numeric'
          placeholder='0,00'
          value={values.value}
          name={t('balance_stack.new_income.value')}
          setValue={val => {
            const newValue = !!val && val !== 'NaN' ? val : '';
            setValues(prev => ({ ...prev, value: newValue }));
          }}
          marginBottom={20}
          marginTop={15}
          required
        />
        <CommonInput
          placeholder={t('balance_stack.new_income.placeholder_description')}
          name={t('balance_stack.new_income.description')}
          marginBottom={20}
          value={values.description}
          setValue={text => setValues(prev => ({ ...prev, description: text }))}
        />
        <PaymentMethodPicker
          name={t('balance_stack.new_income.payment_method')}
          options={newPaymentsOptions}
          value={values.paymentMethod}
          handleValue={text =>
            setValues(prev => ({
              ...prev,
              paymentMethod: text,
            }))
          }
        />
        <Spacer height={20} />
      </Form>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginBottom: 40,
        }}
      >
        <Button
          disabled={!validateValues(validateOption)}
          onPress={handleSubmit}
          text={t('debt_stack.to_pay')}
          color={validateValues(validateOption) ? white : mainColor}
          style={{
            backgroundColor: validateValues(validateOption) ? mainColor : background2,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default IndividualPayment;
