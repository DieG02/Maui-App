import { NavigationProp, RouteProp } from '@react-navigation/native';
import moment from 'moment';
import 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import AccountModal from '../../components/Library/AccountModal/AccountModal';
import Form from '../../components/Library/Form';
import LoadingComponent from '../../components/Library/LoadingComponent';
import Button from '../../components/common/Button';
import CommonInput from '../../components/common/CommonInput';
import DatePicker from '../../components/common/DatePicker';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import InputForm from '../../components/common/InputForm';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import OptionWithIcon from '../../components/common/OptionWithIcon';
import PaymentMethodPicker from '../../components/common/PaymentMethodPicker';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { dictionary } from '../../helpers/dictionary';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import { GET_GENERAL_BALANCE_KEY } from '../../services/Balance/useGeneralBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useMonthlyStats';
import { GET_DEBTS_KEY } from '../../services/Debts/useGetAllDebts';
import useGetAllAccounts, { GET_ALL_ACCOUNTS_KEY } from '../../services/FinancialAccount/useGetAllAccounts';
import useGetTransactionCategories from '../../services/TransactionCategories/useGetTransactionCategories';
import useCreateTransaction from '../../services/Transactions/useCreateTransaction';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import customStyles from '../../styles/customStyles';
import { IFinancialAccount, IPaymentMethod, TransactionStatus, TransactionType } from '../../types/types';
import { getCategoryId } from '../../utils/getCategoryId';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import { STATE, paymentMethods } from '../../utils/payment';
import { queryClient } from '../../utils/queryClient';

const { mainColor, marginHorizontal, background2, white, textBlack } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const TODAY = moment.parseZone().toISOString();

const initialValues: InitialExpense = {
  value: '',
  name: '',
  providerId: '',
  providerName: '',
  categoryId: '',
  isPaid: STATE['PAGADO'].value,
  paymentMethod: paymentMethods['CASH'].value,
  date: TODAY,
};

interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const validateOptions: ValidateOptions = {
  isPaid: ['value', 'categoryId'],
  isPending: ['value', 'providerId', 'categoryId'],
};

const NewExpense = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
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

  const { values, setValues, validateValues } = useForm<InitialExpense>(initialValues);
  const [isModalVisible, setModalVisible] = useState(false);

  const { newPaymentsOptions } = usePayment();

  const { data: categories } = useGetTransactionCategories('debit', 'transaction');
  const { data: { financialAccounts } = { financialAccounts: [] } } = useGetAllAccounts();

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (route.params?.contact) {
      setValues(prev => ({
        ...prev,
        providerId: route.params?.contact.id,
        providerName: route.params?.contact.name,
      }));
    }
  }, [route.params?.contact, setValues]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('balance_stack.new_expense.toast_new_expense'),
      position: 'top',
      visibilityTime: 1000,
    });
  };

  const InvalidateQuery = values.isPaid ? GET_TRANSACTIONS_KEY : GET_DEBTS_KEY;

  const { mutateAsync, isLoading } = useCreateTransaction(
    {
      status: values.isPaid ? TransactionStatus.APPROVED : TransactionStatus.DEBT,
      type: TransactionType.DEBIT,
      date: values.date,
      description: values.name !== '' ? values.name : handleTranslateCategory(values.categoryId, dictionary),
      total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      payment_method: values.isPaid ? (values.paymentMethod as IPaymentMethod) : IPaymentMethod.NONE,
      contactId: route.params?.contact?.id,
      categoryId: getCategoryId(values.categoryId, categories) as string,
      financialAccountId: selectedAccount.id,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InvalidateQuery);
        queryClient.invalidateQueries(GET_ALL_ACCOUNTS_KEY);
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

  const hasMultipleAccounts = financialAccounts.length > 1;
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
      <BackHeaderTitle label={t('balance_stack.new_expense.new_expense')} onPressBack={() => navigation.goBack()} />
      <Spacer height={10} />
      <Form>
        <DatePicker
          name={t('balance_stack.new_income.date')}
          value={values.date}
          setValue={date => setValues(prev => ({ ...prev, date: date }))}
        />
        <OptionWithIcon
          required
          title={t('balance_stack.new_expense.category')}
          placeholder={t('balance_stack.new_expense.placeholder_category')}
          options={categories ? categories : []}
          isModalVisible={modalExpenseCategory}
          setIsModalVisible={setModalExpenseCategory}
          selectedOption={handleTranslateCategory(values.categoryId, dictionary)}
          setSelectedOption={text => {
            setValues(prev => ({ ...prev, categoryId: text }));
          }}
        />
        <AccountModal
          data={financialAccounts}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          selected={selectedAccount}
          setSelected={setSelectedAccount}
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
          marginBottom={15}
          required
          hasButton={hasMultipleAccounts}
          buttonComponent={
            hasMultipleAccounts && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View
                  style={{
                    paddingHorizontal: 10,
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
            )
          }
        />

        <CommonInput
          placeholder={t('balance_stack.new_expense.placeholder_description')}
          name={t('balance_stack.new_expense.description')}
          marginBottom={15}
          value={values.name}
          setValue={text => setValues(prev => ({ ...prev, name: text }))}
        />
        <SelectionModal
          placeholder={t('balance_stack.new_expense.placeholder_provider')}
          name={t('balance_stack.new_expense.provider')}
          required={values.isPaid === false}
          value={values.providerName}
          marginBottom={15}
          onPress={() => {
            navigation.navigate('Providers', { screen: 'NewExpense' });
          }}
          onPressClose={() => {
            setValues(prev => ({
              ...prev,
              providerId: '',
              providerName: '',
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
          </View>
        )}
      </Form>
      <Spacer height={15} />
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
          text={t('balance_stack.new_expense.save_expense')}
          color={validateValues(toValidate) ? white : mainColor}
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : background2,
            borderRadius: 25,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default NewExpense;
