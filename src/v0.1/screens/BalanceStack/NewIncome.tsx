import React, { useState, useEffect, useMemo } from 'react';
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
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { values, setValues, validateValues } = useForm<InitialIncome>(initialValues);

  const { handlePayment, handleSelected, handleState, stateOptions, paymentsOptions, handlePaymentName } = usePayment();

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

  const InvalidateQuery = values.isPaid ? 'Transactions' : 'Debts';

  const { mutateAsync, isLoading } = useCreateTransaction(
    {
      status: values.isPaid ? 'APPROVED' : 'DEBT',
      type: 'CREDIT',
      total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      description: values.name !== '' ? values.name : `${t('balance_stack.sale')} ${moment.parseZone().unix()}`,
      date: values.date,
      payment_method: values.isPaid ? values.paymentMethod : 'NONE',
      categoryId: getCategoryId('Venta', transactionCategories),
      contactId: route.params?.contact?.id,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InvalidateQuery);
        queryClient.invalidateQueries('Balance');
        queryClient.invalidateQueries('Monthly_Stats');
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
        {/* <Switch
          title={t('balance_stack.new_income.state')}
          isPressed={values.isPaid}
          handleSwitch={() => setValues({ ...values, isPaid: !values.isPaid })}
        /> */}
        {values.isPaid === true ? (
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
                width: (width - 100) / 2,
              }}
            >
              <OptionModal
                title={t('balance_stack.new_income.state')}
                options={stateOptions}
                isModalVisible={modalState}
                setIsModalVisible={setModalState}
                selectedOption={handleSelected(values.isPaid)}
                setSelectedOption={text =>
                  setValues(prev => ({
                    ...prev,
                    isPaid: handleState(text),
                  }))
                }
              />
            </View>
            <View
              style={{
                display: 'flex',
                width: (width - 100) / 2,
              }}
            >
              <OptionModal
                title={t('balance_stack.new_income.payment_method')}
                options={paymentsOptions}
                isModalVisible={modalPayment}
                setIsModalVisible={setModalPayment}
                selectedOption={handlePayment(values.paymentMethod)}
                setSelectedOption={text =>
                  setValues(prev => ({
                    ...prev,
                    paymentMethod: handlePaymentName(text),
                  }))
                }
              />
            </View>
          </View>
        ) : (
          <OptionModal
            title={t('balance_stack.new_income.state')}
            options={stateOptions}
            isModalVisible={modalState}
            setIsModalVisible={setModalState}
            selectedOption={handleSelected(values.isPaid)}
            setSelectedOption={text => setValues(prev => ({ ...prev, isPaid: handleState(text) }))}
          />
        )}
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
        {/* <DatePicker
          name={t('balance_stack.new_income.date')}
          value={values.date}
          setValue={date => setValues(prev => ({ ...prev, date: date }))}
        /> */}
        <InputDate
          name={t('balance_stack.new_income.date')}
          date={values.date}
          setDate={date => setValues(prev => ({ ...prev, date: date }))}
          color={mainColor}
        />
        <Spacer height={15} />
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
