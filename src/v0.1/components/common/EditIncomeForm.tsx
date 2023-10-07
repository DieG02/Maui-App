import React, { useEffect, useMemo, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import InputForm from '../../components/common/InputForm';
import CommonInput from '../../components/common/CommonInput';
import OptionModal from '../../components/common/OptionModal';
import InputDate from '../../components/common/InputDate';
import 'moment-timezone';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import Form from '../../components/Library/Form';
import customStyles from '../../styles/customStyles';
import { NavigationProp } from '@react-navigation/native';
import usePayment from '../../hooks/usePayment';
import useForm from '../../hooks/useForm';
import useEditIncome from '../../services/Incomes/useEditIncome';
import { queryClient } from '../../utils/queryClient';
import Button from './Button';
import LoadingComponent from '../Library/LoadingComponent';
import { useTranslation } from 'react-i18next';

interface Props {
  navigation: NavigationProp<any, any>;
  params: any;
  data: any;
}
interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const { mainColor, width, marginHorizontal } = customStyles;
const validateOptions: ValidateOptions = {
  isPaid: ['value'],
  isPending: ['value', 'clientId'],
};

const EditIncomeForm = ({ navigation, data, params }: Props) => {
  const { t } = useTranslation();
  const NEW_INCOME = 'balance_stack.new_income';
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { handlePayment, handlePaymentName, handleSelected, handleState, stateOptions, paymentsOptions } = usePayment();

  const initialValues: InitialIncome = {
    value: String(data?.total_amount).replace('.', ','),
    name: data.description,
    clientId: data.contactId ? data.contactId : '',
    clientName: data.contact ? data.contact.name : '',
    isPaid: data.status === 'APPROVED',
    paymentMethod: handlePaymentName(data.payment_method),
    date: data.date,
  };

  const { values, setValues, validateValues } = useForm<InitialIncome>(initialValues);

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (params?.contact) {
      setValues(prev => ({
        ...prev,
        clientName: params?.contact.name,
        clientId: params?.contact.id,
      }));
    }
  }, [params?.contact]);

  const showToast = () => {
    ToastAndroid.showWithGravity(t('debt_stack.edit_debt.toast_edited'), ToastAndroid.LONG, ToastAndroid.TOP);
  };

  const { mutateAsync, isLoading } = useEditIncome(
    data.id,
    {
      paymentMethod: handlePayment(values.paymentMethod),
      clientId: params?.contact ? params?.contact?.id : values.clientId,
      date: values.date,
      isPaid: values.isPaid,
      name: values.name,
      value: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Transactions');
        queryClient.removeQueries('IncomeDetail');
        navigation.navigate('balance');
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
    <View
      style={{
        flex: 1,
      }}
    >
      <Form>
        <InputForm
          keyboardType='numeric'
          placeholder='0,00'
          value={values.value}
          name={t(`${NEW_INCOME}.value`)}
          setValue={val => {
            const newValue = !!val && val !== 'NaN' ? val : '';
            setValues(prev => ({ ...prev, value: newValue }));
          }}
          marginBottom={20}
          marginTop={15}
          required
        />
        <CommonInput
          placeholder={t(`${NEW_INCOME}.placeholder_description`)}
          name={t(`${NEW_INCOME}.description`)}
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
                title={t(`${NEW_INCOME}.state`)}
                options={stateOptions}
                isModalVisible={modalState}
                setIsModalVisible={setModalState}
                selectedOption={handleSelected(values.isPaid)}
                setSelectedOption={text => setValues(prev => ({ ...prev, isPaid: handleState(text) }))}
              />
            </View>
            <View
              style={{
                display: 'flex',
                width: (width - 100) / 2,
              }}
            >
              <OptionModal
                title={t(`${NEW_INCOME}.payment_method`)}
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
            title={t(`${NEW_INCOME}.state`)}
            options={stateOptions}
            isModalVisible={modalState}
            setIsModalVisible={setModalState}
            selectedOption={handleSelected(values.isPaid)}
            setSelectedOption={text => setValues(prev => ({ ...prev, isPaid: handleState(text) }))}
          />
        )}
        <SelectionModal
          placeholder={t(`${NEW_INCOME}.placeholder_client`)}
          name={t(`${NEW_INCOME}.client`)}
          required={values.isPaid === false}
          value={values.clientName}
          marginBottom={20}
          onPress={() => {
            navigation.navigate('Clients', { screen: 'EditIncome' });
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
        <InputDate
          name={t(`${NEW_INCOME}.date`)}
          date={values.date}
          setDate={date => setValues(prev => ({ ...prev, date: date }))}
          color={mainColor}
        />
      </Form>
      <View
        style={{
          height: 80,
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
        }}
      >
        <Button
          disabled={!validateValues(toValidate)}
          onPress={handleSubmit}
          text={t('debt_stack.edit_debt.save_changes')}
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : '#B3B3B3',
            borderRadius: 25,
          }}
        />
      </View>
    </View>
  );
};

export default EditIncomeForm;
