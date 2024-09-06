import { NavigationProp, RouteProp } from '@react-navigation/native';
import moment from 'moment';
import 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../../components/common/Button';
import CommonInput from '../../components/common/CommonInput';
import DatePicker from '../../components/common/DatePicker';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import InputForm from '../../components/common/InputForm';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import PaymentMethodPicker from '../../components/common/PaymentMethodPicker';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import AccountModal from '../../components/Library/AccountModal/AccountModal';
import Form from '../../components/Library/Form';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import { GET_GENERAL_BALANCE_KEY } from '../../services/Balance/useGeneralBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useGetStats';
import { GET_DEBTS_KEY } from '../../services/Debts/useGetAllDebts';
import useGetFinancialAccount from '../../services/FinancialAccount/useGetFinancialAccounts';
import useGetTransactionCategories from '../../services/TransactionCategories/useGetTransactionCategories';
import useCreateTransaction from '../../services/Transactions/useCreateTransaction';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import customStyles from '../../styles/customStyles';
import { IFinancialAccount, IPaymentMethod, TransactionStatus, TransactionType } from '../../types/types';
import { getCategoryId } from '../../utils/getCategoryId';
import { paymentMethods, STATE } from '../../utils/payment';
import { queryClient } from '../../utils/queryClient';

// TODO:Refactor this component

const { marginHorizontal, mainColor, background2, textBlack, white } = customStyles;

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<IFinancialAccount>({
    id: '',
    businessId: '',
    accountName: '',
    currency: {
      code: '',
      locale: '',
      isoCode: '',
      country: '',
      symbol: '',
      image: null,
      id: '',
    },
    mainAccount: false,
    total_balance: 0,
  });

  const { newPaymentsOptions } = usePayment();

  const { data: transactionCategories } = useGetTransactionCategories('credit', 'transaction');
  const { data: { financialAccounts } = { financialAccounts: [] } } = useGetFinancialAccount();

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
  }, [route.params?.contact, setValues]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('balance_stack.new_income.toast_new_expense'),
      position: 'top',
      visibilityTime: 1000,
    });
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
      financialAccountId: selectedAccount.id,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InvalidateQuery);
        queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
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

  const mainAccountDefault = financialAccounts.find(account => account.mainAccount);

  useEffect(() => {
    if (mainAccountDefault) {
      setSelectedAccount(mainAccountDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          autoFocus
          marginBottom={15}
          required
          hasButton
          buttonComponent={
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  marginTop: 4,
                  columnGap: 3,
                }}
              >
                <CountryFlag
                  isoCode={selectedAccount.currency.isoCode}
                  size={40}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                    marginHorizontal: 5,
                  }}
                />
                <Text style={{ color: textBlack, fontSize: 16, fontFamily: 'Gilroy-SemiBold', marginTop: 2 }}>
                  {selectedAccount.currency.code}
                </Text>
                <Entypo name='chevron-down' size={25} color={mainColor} />
              </View>
            </TouchableOpacity>
          }
        />

        <AccountModal
          data={financialAccounts}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          selected={selectedAccount}
          setSelected={setSelectedAccount}
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
