import React, { useState } from 'react';
import { View, ToastAndroid } from 'react-native';
import InputForm from '../../components/common/InputForm';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import CommonInput from '../../components/common/CommonInput';
import OptionModal from '../../components/common/OptionModal';
import InputDate from '../../components/common/InputDate';
import moment from 'moment';
import 'moment-timezone';
import Button from '../../components/common/Button';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { paymentMethods } from '../../utils/payment';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import Form from '../../components/Library/Form';
import { queryClient } from '../../utils/queryClient';
import Spacer from '../../components/common/Spacer';
import { useTranslation } from 'react-i18next';
import usePayDebtById from '../../services/Debts/usePayDebtById';
import useGetDebtById from '../../services/Debts/useGetDebtsById';
import { Alert } from 'react-native';

const { marginHorizontal, mainColor, background2, navyBlue } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const TODAY = moment.parseZone().toISOString();

const initialValues: InitialDebt = {
  value: '',
  description: '',
  paymentMethod: paymentMethods['CASH'].es,
  date: TODAY,
};

const validateOption = ['value'];

const IndividualPayment = ({ navigation, route }: Props) => {
  const { params } = route;
  const { t } = useTranslation();
  const [modalPayment, setModalPayment] = useState(false);

  const { values, setValues, validateValues } = useForm<InitialDebt>(initialValues);

  const { handlePayment, paymentsOptions } = usePayment();

  const showToast = () => {
    ToastAndroid.showWithGravity(t('debt_stack.payment_done'), ToastAndroid.LONG, ToastAndroid.TOP);
  };

  const { data: debtor, isLoading: loading } = useGetDebtById(params?.contact);

  const equalToDebt = Number(values.value) === debtor.status.totalToPay;

  const { mutateAsync, isLoading } = usePayDebtById(
    {
      type: params?.type,
      paymentAmount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      paidAt: values.date,
      payment_method: handlePayment(values.paymentMethod),
      debtId: params?.debtId,
      description:
        values.description !== '' ? values.description : `${t('balance_stack.payment')} ${moment.parseZone().unix()}`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Debts');
        queryClient.invalidateQueries('Debt', params?.contact);
        queryClient.invalidateQueries('Transactions');
        queryClient.invalidateQueries('Balance');
        queryClient.invalidateQueries('Monthly_Stats');
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
      <BackHeaderTitle
        label={t('debt_stack.new_payment')}
        onPressBack={() => navigation.goBack()}
        hasType
        color={navyBlue}
      />
      <Form>
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
        <OptionModal
          title={t('balance_stack.new_income.payment_method')}
          options={paymentsOptions}
          isModalVisible={modalPayment}
          setIsModalVisible={setModalPayment}
          selectedOption={t(values.paymentMethod)}
          setSelectedOption={text =>
            setValues(prev => ({
              ...prev,
              paymentMethod: text,
            }))
          }
        />
        <InputDate
          name={t('balance_stack.new_income.date')}
          date={values.date}
          setDate={date => setValues(prev => ({ ...prev, date: date }))}
          color={navyBlue}
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
          color={validateValues(validateOption) ? 'white' : navyBlue}
          style={{
            backgroundColor: validateValues(validateOption) ? navyBlue : background2,
            borderRadius: 25,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default IndividualPayment;
