import React, { useEffect, useMemo } from 'react';
import { View, ToastAndroid } from 'react-native';
import InputForm from '../../components/common/InputForm';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import CommonInput from '../../components/common/CommonInput';
import moment from 'moment';
import 'moment-timezone';
import Button from '../../components/common/Button';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { paymentMethods, STATE } from '../../utils/payment';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import Form from '../../components/Library/Form';
import { queryClient } from '../../utils/queryClient';
import Spacer from '../../components/common/Spacer';
import { useTranslation } from 'react-i18next';
import useCreateTransaction from '../../services/Transactions/useCreateTransaction';
import useGetTransactionCategories from '../../services/TransactionCategories/useGetTransactionCategories';
import { getCategoryId } from '../../utils/getCategoryId';
import DatePicker from '../../components/common/DatePicker';
import PaymentMethodPicker from '../../components/common/PaymentMethodPicker';
// import StateSwitch from '../../components/common/StateSwitch';
import { GET_BALANCE_KEY } from '../../services/Balance/useGetBalance';
import { IPaymentMethod, TransactionStatus, TransactionType } from '../../types/types';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useGetStats';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import { GET_DEBTS_KEY } from '../../services/Debts/useGetAllDebts';

// TODO:Refactor this component

const { marginHorizontal, mainColor, width, background2, textBlack, white } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const TODAY = moment.parseZone().toISOString();

const initialValues: InitialIncome = {
  value: '',
  name: '',
  clientId: '',
  clientName: '',
  isPaid: STATE['PAGADO'].value,
  paymentMethod: paymentMethods['CASH'].value,
  date: TODAY,
};

interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const validateOptions: ValidateOptions = {
  isPaid: ['value'],
  isPending: ['value', 'clientId'],
};

const NewIncome = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const { values, setValues, validateValues } = useForm<InitialIncome>(initialValues);

  const { newPaymentsOptions } = usePayment();

  const { data: transactionCategories } = useGetTransactionCategories('credit', 'transaction');

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (route.params?.contact) {
      setValues(prev => ({
        ...prev,
        clientName: route.params?.contact.name,
        clientId: route.params?.contact.id,
      }));
    }
  }, [route.params?.contact]);

  const showToast = () => {
    ToastAndroid.showWithGravity(t('balance_stack.new_income.toast_new_expense'), ToastAndroid.LONG, ToastAndroid.TOP);
  };

  const InvalidateQuery = values.isPaid ? GET_TRANSACTIONS_KEY : GET_DEBTS_KEY;

  const { mutateAsync, isLoading } = useCreateTransaction(
    {
      status: values.isPaid ? TransactionStatus.APPROVED : TransactionStatus.DEBT,
      type: TransactionType.CREDIT,
      total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      description: values.name !== '' ? values.name : `${t('balance_stack.sale')} ${moment.parseZone().unix()}`,
      date: values.date,
      payment_method: values.isPaid ? (values.paymentMethod as IPaymentMethod) : IPaymentMethod.NONE,
      categoryId: getCategoryId('Venta', transactionCategories) as string,
      contactId: route.params?.contact?.id,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InvalidateQuery);
        queryClient.invalidateQueries(GET_BALANCE_KEY);
        queryClient.invalidateQueries(GET_MONTHLY_STATS_KEY);
        navigation.goBack();
        showToast();
      },
    }
  );

  const handleSubmit = () => {
    if (validateValues(toValidate)) {
      mutateAsync();
    }
  };

  if (isLoading) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('balance_stack.new_income.new_income')}
        onPressBack={() => navigation.goBack()}
        color={textBlack}
      />
      <Spacer height={10} />
      <Form>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{
              display: 'flex',
              width: (width - 80) / 2,
            }}
          >
            <DatePicker
              name={t('balance_stack.new_income.date')}
              value={values.date}
              setValue={date => setValues(prev => ({ ...prev, date: date }))}
            />
          </View>
          {/* <View
            style={{
              display: 'flex',
              width: (width - 80) / 2,
            }}
          >
            <StateSwitch
              title={t('balance_stack.new_income.state')}
              isPressed={values.isPaid}
              handleSwitch={() => setValues({ ...values, isPaid: !values.isPaid })}
            />
          </View> */}
        </View>
        <InputForm
          keyboardType='numeric'
          placeholder='0,00'
          value={values.value}
          name={t('balance_stack.new_income.value')}
          setValue={val => {
            const newValue = !!val && val !== 'NaN' ? val : '';
            setValues(prev => ({ ...prev, value: newValue }));
          }}
          autoFocus
          marginBottom={15}
          marginTop={5}
          required
        />
        <CommonInput
          placeholder={t('balance_stack.new_income.placeholder_description')}
          name={t('balance_stack.new_income.description')}
          marginBottom={15}
          value={values.name}
          setValue={text => setValues(prev => ({ ...prev, name: text }))}
        />
        <SelectionModal
          placeholder={t('balance_stack.new_income.placeholder_client')}
          name={t('balance_stack.new_income.client')}
          required={values.isPaid === false}
          value={values.clientName}
          marginBottom={15}
          onPress={() => {
            navigation.navigate('Clients', { screen: 'NewIncome' });
          }}
          onPressClose={() => {
            setValues(prev => ({
              ...prev,
              clientId: '',
              clientName: '',
            }));
            navigation.setParams({ contact: '' });
          }}
        />
        {values.isPaid === true && (
          <View>
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
            <Spacer height={15} />
          </View>
        )}
      </Form>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginBottom: 40,
        }}
      >
        <Button
          disabled={!validateValues(toValidate)}
          onPress={handleSubmit}
          text={t('balance_stack.new_income.save_income')}
          color={validateValues(toValidate) ? white : mainColor}
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : background2,
            borderRadius: 30,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default NewIncome;
