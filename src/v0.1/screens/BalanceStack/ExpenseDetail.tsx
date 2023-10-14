import { useState, useEffect, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import InputForm from '../../components/common/InputForm';
import { NavigationProp } from '@react-navigation/native';
import CommonInput from '../../components/common/CommonInput';
import OptionModal from '../../components/common/OptionModal';
import InputDate from '../../components/common/InputDate';
import 'moment-timezone';
import Spacer from '../../components/common/Spacer';
import Button from '../../components/common/Button';
import customStyles from '../../styles/customStyles';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import LoadingComponent from '../../components/Library/LoadingComponent';
import Form from '../../components/Library/Form';
import useEditExpense from '../../services/Expense/useEditExpense';
import { showToast } from '../../utils/toast';
import OptionWithIcon from '../../components/common/OptionWithIcon';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import { dictionary } from '../../helpers/dictionary';
import { getCategoryId, getCategoryName } from '../../utils/getCategoryId';
import useGetTransactionCategories from '../../services/TransactionCategories/useGetTransactionCategories';
import useEditTransaction from '../../services/Transactions/useEditTransaction';

//FIXME: Make refactor to clean form, use react-hook-form

const { width } = Dimensions.get('window');
const { mainColor, marginHorizontal } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
  params: any;
  data: any;
}

const validateOptions: ValidateOptions = {
  isPaid: ['value', 'categoryId'],
  isPending: ['value', 'providerId', 'categoryId'],
};

const NEW_EXPENSE = 'balance_stack.new_expense';
//FIXME: Get data from query, there are some issues with the category and contact

const ExpenseDetail = ({ navigation, data, params }: Props) => {
  const { t } = useTranslation();
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const { data: expenseCategories } = useGetTransactionCategories('debit', 'transaction');
  const { handlePayment, handlePaymentName, handleSelected, handleState, stateOptions, paymentsOptions } = usePayment();

  const initialValues: InitialExpense = {
    value: String(data.total_amount).replace('.', ','),
    name: data.description,
    providerId: data.contactId ? data.contactId : null,
    providerName: data.contact ? data.contact.name : '',
    categoryId: getCategoryName(data.categoryId, expenseCategories),
    isPaid: data.status === 'APPROVED',
    paymentMethod: handlePaymentName(data.payment_method),
    date: data.date,
  };

  const { values, setValues, validateValues } = useForm<InitialExpense>(initialValues);

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (params?.contact) {
      setValues(prev => ({
        ...prev,
        providerId: params?.contact.id,
        providerName: params?.contact.name,
      }));
    }
  }, [params?.contact]);

  const payload = {
    payment_method: handlePayment(values.paymentMethod),
    contactId: params?.contact ? params?.contact?.id : values.providerId,
    date: values.date,
    // status: values.isPaid ? 'APPROVED' : 'DEBT',
    description: values.name,
    total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
    categoryId: getCategoryId(values.categoryId, expenseCategories),
  };

  const { mutateAsync, isLoading } = useEditTransaction(data?.id, payload, {
    onSuccess: () => {
      queryClient.invalidateQueries('Transactions');
      queryClient.removeQueries(['Transaction_By_Id', data?.id]);
      navigation.navigate('balance');
      showToast(t('debt_stack.edit_debt.toast_edited'));
    },
  });

  const handleSubmit = () => {
    if (validateValues(toValidate)) return mutateAsync();
  };

  if (isLoading) return <LoadingComponent color={mainColor} />;

  return (
    <>
      <Form>
        <Spacer height={10} />
        <OptionWithIcon
          title={t(`${NEW_EXPENSE}.category`)}
          required
          placeholder={t(`${NEW_EXPENSE}.placeholder_category`)}
          options={expenseCategories ? expenseCategories : []}
          isModalVisible={modalExpenseCategory}
          setIsModalVisible={setModalExpenseCategory}
          selectedOption={handleTranslateCategory(values.categoryId, dictionary)}
          setSelectedOption={text => {
            setValues(prev => ({
              ...prev,
              categoryId: text,
              name: text,
            }));
          }}
        />
        <InputForm
          name={t(`${NEW_EXPENSE}.value`)}
          keyboardType='numeric'
          placeholder='0,00'
          value={values.value}
          setValue={val => {
            const newValue = !!val && val !== 'NaN' ? val : '';
            setValues(prev => ({ ...prev, value: newValue }));
          }}
          marginBottom={20}
          required
        />
        <CommonInput
          name={t(`${NEW_EXPENSE}.description`)}
          placeholder={t(`${NEW_EXPENSE}.placeholder_description`)}
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
                title={t(`${NEW_EXPENSE}.state`)}
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
                title={t(`${NEW_EXPENSE}.payment_method`)}
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
            title={t(`${NEW_EXPENSE}.state`)}
            options={stateOptions}
            isModalVisible={modalState}
            setIsModalVisible={setModalState}
            selectedOption={handleSelected(values.isPaid)}
            setSelectedOption={text => setValues(prev => ({ ...prev, isPaid: handleState(text) }))}
          />
        )}
        <SelectionModal
          name={t(`${NEW_EXPENSE}.provider`)}
          placeholder={t(`${NEW_EXPENSE}.placeholder_provider`)}
          required={values.isPaid === false}
          value={values.providerName}
          marginBottom={20}
          onPress={() => {
            navigation.navigate('Providers', { screen: 'EditExpense' });
          }}
          onPressClose={() => {
            setValues(prev => ({
              ...prev,
              providerId: null,
              providerName: '',
            }));
            navigation.setParams({ contact: null });
          }}
        />

        <InputDate
          name={t(`${NEW_EXPENSE}.date`)}
          date={values.date}
          setDate={date => setValues(prev => ({ ...prev, date }))}
          color={mainColor}
        />
        <Spacer height={10} />
      </Form>
      <View
        style={{
          height: 80,
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
        }}
      >
        <Button
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : '#B3B3B3',
            borderRadius: 25,
          }}
          disabled={!validateValues(toValidate)}
          onPress={handleSubmit}
          text={t('debt_stack.edit_debt.save_changes')}
        />
      </View>
    </>
  );
};

export default ExpenseDetail;
