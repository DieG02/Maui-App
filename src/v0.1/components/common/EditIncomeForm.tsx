import React, { useEffect, useMemo } from 'react';
import { ToastAndroid, View } from 'react-native';
import InputForm from '../../components/common/InputForm';
import CommonInput from '../../components/common/CommonInput';
import 'moment-timezone';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import Form from '../../components/Library/Form';
import customStyles from '../../styles/customStyles';
import { NavigationProp } from '@react-navigation/native';
import usePayment from '../../hooks/usePayment';
import useForm from '../../hooks/useForm';
import { queryClient } from '../../utils/queryClient';
import Button from './Button';
import LoadingComponent from '../Library/LoadingComponent';
import { useTranslation } from 'react-i18next';
import useEditTransaction from '../../services/Transactions/useEditTransaction';
import DatePicker from './DatePicker';
import StateSwitch from './StateSwitch';
import PaymentMethodPicker from './PaymentMethodPicker';
import Spacer from './Spacer';

//FIXME: Make refactor to clean form, use react-hook-form

interface Props {
  navigation: NavigationProp<any, any>;
  params: any;
  data: any;
}
interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const { mainColor, width, marginHorizontal, background2 } = customStyles;

const validateOptions: ValidateOptions = {
  isPaid: ['value'],
  isPending: ['value', 'clientId'],
};

const NEW_INCOME = 'balance_stack.new_income';

const EditIncomeForm = ({ navigation, data, params }: Props) => {
  const { t } = useTranslation();

  const { newPaymentsOptions } = usePayment();

  const initialValues: InitialIncome = {
    value: String(data?.total_amount).replace('.', ','),
    name: data.description,
    clientId: data.contactId ? data.contactId : null,
    clientName: data.contact ? data.contact.name : '',
    isPaid: data.status === 'APPROVED',
    paymentMethod: data.payment_method,
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

  const { mutateAsync, isLoading } = useEditTransaction(
    data.id,
    {
      payment_method: values.isPaid ? values.paymentMethod : 'NONE',
      contactId: params?.contact ? params?.contact?.id : values.clientId,
      date: values.date,
      status: values.isPaid ? 'APPROVED' : 'DEBT',
      description: values.name,
      total_amount: parseFloat(values.value.replace(/\./g, '').replace(',', '.')),
      type: 'CREDIT',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Transactions');
        queryClient.removeQueries(['Transaction_By_Id', data?.id]);
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
          required
        />
        <CommonInput
          placeholder={t(`${NEW_INCOME}.placeholder_description`)}
          name={t(`${NEW_INCOME}.description`)}
          marginBottom={20}
          value={values.name}
          setValue={text => setValues(prev => ({ ...prev, name: text }))}
        />
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
              clientId: null,
              clientName: '',
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
          disabled={!validateValues(toValidate)}
          onPress={handleSubmit}
          text={t('balance_stack.new_income.save_income')}
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : background2,
          }}
        />
      </View>
    </View>
  );
};

export default EditIncomeForm;
