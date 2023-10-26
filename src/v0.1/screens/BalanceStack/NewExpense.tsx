import React, { useState, useEffect, useMemo } from 'react';
import { View, Dimensions, ToastAndroid, Platform, KeyboardAvoidingView } from 'react-native';
import InputForm from '../../components/common/InputForm';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import CommonInput from '../../components/common/CommonInput';
import OptionModal from '../../components/common/OptionModal';
import InputDate from '../../components/common/InputDate';
import moment from 'moment';
import 'moment-timezone';
import Spacer from '../../components/common/Spacer';
import Button from '../../components/common/Button';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import useForm from '../../hooks/useForm';
import { STATE, paymentMethods } from '../../utils/payment';
import usePayment from '../../hooks/usePayment';
import LoadingComponent from '../../components/Library/LoadingComponent';
import Form from '../../components/Library/Form';
import OptionWithIcon from '../../components/common/OptionWithIcon';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import { dictionary } from '../../helpers/dictionary';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import useCreateTransaction from '../../services/Transactions/useCreateTransaction';
import useGetTransactionCategories from '../../services/TransactionCategories/useGetTransactionCategories';
import { getCategoryId } from '../../utils/getCategoryId';

const { width } = Dimensions.get('window');

const { mainColor, marginHorizontal, background2 } = customStyles;
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
  paymentMethod: paymentMethods['CASH'].es,
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
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);

  const { values, setValues, validateValues } = useForm<InitialExpense>(initialValues);

  const { handlePayment, handleSelected, handleState, stateOptions, paymentsOptions } = usePayment();

  const { data } = useGetTransactionCategories('debit', 'transaction');

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
  }, [route.params?.contact]);

  const showToast = () => {
    ToastAndroid.showWithGravity(t('balance_stack.new_expense.toast_new_expense'), ToastAndroid.LONG, ToastAndroid.TOP);
  };

  const InvalidateQuery = values.isPaid ? 'Transactions' : 'Debts';

  const { mutateAsync, isLoading } = useCreateTransaction(
    {
      status: values.isPaid ? 'APPROVED' : 'DEBT',
      type: 'DEBIT',
      date: values.date,
      description: values.name !== '' ? values.name : handleTranslateCategory(values.categoryId, dictionary),
      total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      payment_method: values.isPaid ? handlePayment(values.paymentMethod) : 'NONE',
      contactId: route.params?.contact?.id,
      categoryId: getCategoryId(values.categoryId, data),
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(InvalidateQuery);
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
        label={t('balance_stack.new_expense.new_expense')}
        onPressBack={() => navigation.goBack()}
        headerStyle={{ backgroundColor: background2 }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Form>
          <Spacer height={10} />
          <OptionWithIcon
            required
            title={t('balance_stack.new_expense.category')}
            placeholder={t('balance_stack.new_expense.placeholder_category')}
            options={data ? data : []}
            isModalVisible={modalExpenseCategory}
            setIsModalVisible={setModalExpenseCategory}
            selectedOption={handleTranslateCategory(values.categoryId, dictionary)}
            setSelectedOption={text => {
              setValues(prev => ({ ...prev, categoryId: text }));
            }}
          />
          <InputForm
            keyboardType='numeric'
            placeholder='0,00'
            value={values.value}
            name={t('balance_stack.new_expense.value')}
            setValue={val => {
              const newValue = !!val && val !== 'NaN' ? val : '';
              setValues(prev => ({ ...prev, value: newValue }));
            }}
            marginBottom={20}
            required
          />
          <CommonInput
            placeholder={t('balance_stack.new_expense.placeholder_description')}
            name={t('balance_stack.new_expense.description')}
            marginBottom={20}
            value={values.name}
            setValue={text => setValues(prev => ({ ...prev, name: text }))}
          />

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
                  title={t('balance_stack.new_expense.state')}
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
                  title={t('balance_stack.new_expense.payment_method')}
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
              </View>
            </View>
          ) : (
            <OptionModal
              title={t('balance_stack.new_expense.state')}
              options={stateOptions}
              isModalVisible={modalState}
              setIsModalVisible={setModalState}
              selectedOption={handleSelected(values.isPaid)}
              setSelectedOption={text => setValues(prev => ({ ...prev, isPaid: handleState(text) }))}
            />
          )}
          <SelectionModal
            placeholder={t('balance_stack.new_expense.placeholder_provider')}
            name={t('balance_stack.new_expense.provider')}
            required={values.isPaid === false}
            value={values.providerName}
            marginBottom={20}
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
          <InputDate
            name={t('balance_stack.new_expense.date')}
            date={values.date}
            setDate={date => setValues(prev => ({ ...prev, date: date }))}
            color={mainColor}
          />
          <Spacer height={20} />
        </Form>
      </KeyboardAvoidingView>
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
          color={validateValues(toValidate) ? 'white' : mainColor}
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
