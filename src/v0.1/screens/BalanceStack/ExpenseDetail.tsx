import { useState, useEffect, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import InputForm from '../../components/common/InputForm';
import { NavigationProp } from '@react-navigation/native';
import CommonInput from '../../components/common/CommonInput';
import 'moment-timezone';
import Spacer from '../../components/common/Spacer';
import Button from '../../components/common/Button';
import customStyles from '../../styles/customStyles';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import useForm from '../../hooks/useForm';
import usePayment from '../../hooks/usePayment';
import LoadingComponent from '../../components/Library/LoadingComponent';
import Form from '../../components/Library/Form';
import { showToast } from '../../utils/toast';
import OptionWithIcon from '../../components/common/OptionWithIcon';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import { dictionary } from '../../helpers/dictionary';
import { getCategoryId } from '../../utils/getCategoryId';
import useGetTransactionCategories from '../../services/TransactionCategories/useGetTransactionCategories';
import useEditTransaction from '../../services/Transactions/useEditTransaction';
import DatePicker from '../../components/common/DatePicker';
import StateSwitch from '../../components/common/StateSwitch';
import PaymentMethodPicker from '../../components/common/PaymentMethodPicker';

//FIXME: Make refactor to clean form, use react-hook-form

const { width } = Dimensions.get('window');
const { mainColor, marginHorizontal, background2 } = customStyles;
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
  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const { data: expenseCategories, isFetching } = useGetTransactionCategories('debit', 'transaction');
  const { newPaymentsOptions } = usePayment();

  const initialValues: InitialExpense = {
    value: String(data.total_amount).replace('.', ','),
    name: data.description,
    providerId: data.contactId ? data.contactId : null,
    providerName: data.contact ? data.contact.name : '',
    categoryId: data.category.name,
    isPaid: data.status === 'APPROVED',
    paymentMethod: data.payment_method,
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
    payment_method: values.isPaid ? values.paymentMethod : 'NONE',
    contactId: params?.contact ? params?.contact?.id : values.providerId,
    date: values.date,
    status: values.isPaid ? 'APPROVED' : 'DEBT',
    description: values.name,
    total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
    categoryId: getCategoryId(values.categoryId, expenseCategories),
    type: 'DEBIT',
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

  if (isFetching || isLoading) return <LoadingComponent color={mainColor} />;

  return (
    <>
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
          <View
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
          </View>
        </View>
        <OptionWithIcon
          title={t(`${NEW_EXPENSE}.category`)}
          required
          placeholder={t(`${NEW_EXPENSE}.placeholder_category`)}
          options={expenseCategories ? expenseCategories : []}
          isModalVisible={modalExpenseCategory}
          setIsModalVisible={setModalExpenseCategory}
          selectedOption={t(handleTranslateCategory(values.categoryId, dictionary))}
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
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : background2,
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
