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
import useGetExpenseCategories from '../../services/Expenses/useGetExpenseCategories';
import Form from '../../components/Library/Form';
import useEditExpense from '../../services/Expense/useEditExpense';
import { showToast } from '../../utils/toast';
import OptionWithIcon from '../../components/common/OptionWithIcon';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import { dictionary } from '../../helpers/dictionary';

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

const ExpenseDetail = ({ navigation, data, params }: Props) => {
  const { t } = useTranslation();
  const NEW_EXPENSE = 'balance_stack.new_expense';
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const { data: expenseCategory } = useGetExpenseCategories();
  const { handlePayment, handlePaymentName, handleSelected, handleState, stateOptions, paymentsOptions } = usePayment();

  const handleObjValue = (findValue: string, byKey: string, returnKey: string, data: any[]) => {
    const object = data.find(element => element[byKey] === findValue);
    return object ? object[returnKey] : null;
  };

  const initialValues: InitialExpense = {
    value: String(data.value).replace('.', ','),
    name: data.name,
    providerId: data?.provider?.id,
    providerName: data?.provider ? data?.provider.name : '',
    categoryId: handleObjValue(data.categoryId, 'id', 'name', expenseCategory),
    isPaid: data.isPaid,
    paymentMethod: handlePaymentName(data.paymentMethod),
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

  const { mutateAsync, isLoading } = useEditExpense(
    data.id,
    {
      paymentMethod: handlePayment(values.paymentMethod),
      providerId: params?.contact ? params?.contact?.id : values.providerId,
      date: values.date,
      isPaid: values.isPaid,
      name: values.name,
      value: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      categoryId: expenseCategory && handleObjValue(values.categoryId, 'name', 'id', expenseCategory),
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Transactions');
        queryClient.removeQueries('expenseDetail');
        navigation.navigate('balance');
        showToast(t('debt_stack.edit_debt.toast_edited'));
      },
    }
  );

  const handleSubmit = () => {
    if (validateValues(toValidate)) mutateAsync();
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
          options={expenseCategory ? expenseCategory : []}
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
              providerId: '',
              providerName: '',
            }));
            navigation.setParams({ contact: '' });
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
