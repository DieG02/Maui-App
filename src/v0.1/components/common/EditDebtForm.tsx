import React, { useState } from 'react';
import { View } from 'react-native';
import InputForm from './InputForm';
import CommonInput from './CommonInput';
import InputDate from './InputDate';
import 'moment-timezone';
import Form from '../Library/Form';
import customStyles from '../../styles/customStyles';
import { NavigationProp } from '@react-navigation/native';
import useForm from '../../hooks/useForm';
import Button from './Button';
import { parseDDMMYY } from '../../utils/helper';
import { showToast } from '../../utils/toast';
import OptionModal from './OptionModal';
import usePayment from '../../hooks/usePayment';
import { useTranslation } from 'react-i18next';

interface Props {
  navigation: NavigationProp<any, any>;
  data: any;
}

const validateOptions = {
  value: ['value'],
};

const { mainColor, width, marginHorizontal } = customStyles;

const EditDebtForm = ({ navigation, data }: Props) => {
  const { t } = useTranslation();
  const { params } = data;
  const { handlePaymentName, paymentsOptions } = usePayment();

  const [modalPayment, setModalPayment] = useState(false);

  const initialValues: any =
    params?.type === 'debt'
      ? {
          value: String(params?.item?.value || params?.item?.amount).replace('.', ','),
          name: params?.item?.name || `${t('debt_stack.edit_debt.credit_entry')} ${parseDDMMYY(params?.item?.paidAt)}`,
          date: params?.item?.paidAt,
        }
      : {
          value: String(params?.item?.amount).replace('.', ','),
          name: `${t('debt_stack.edit_debt.credit_entry')} ${parseDDMMYY(params?.item?.paidAt)}`,
          date: params?.item?.paidAt,
          paymentMethod: handlePaymentName(params?.item?.paymentMethod),
        };

  const { values, setValues, validateValues } = useForm<InitialIncome>(initialValues);

  const handleSubmit = () => {
    if (validateValues(validateOptions.value)) {
      //   mutateAsync();
      navigation.goBack();
      showToast(t('debt_stack.edit_debt.debt_edited'));
    }
  };

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
          name={t('balance_stack.new_expense.value')}
          setValue={val => {
            const newValue = !!val && val !== 'NaN' ? val : '';
            setValues(prev => ({ ...prev, value: newValue }));
          }}
          marginBottom={20}
          marginTop={15}
          required
        />
        <CommonInput
          placeholder={t('debt_stack.edit_debt.description_placeholder')}
          name={t('balance_stack.new_expense.description')}
          marginBottom={20}
          value={values.name}
          setValue={text => setValues(prev => ({ ...prev, name: text }))}
        />
        {params?.type !== 'debt' && (
          <View
            style={{
              display: 'flex',
              width: width / 2,
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
        )}
        <InputDate
          name={t('balance_stack.new_expense.date')}
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
          disabled={!validateValues(validateOptions.value)}
          onPress={handleSubmit}
          text={t('debt_stack.edit_debt.save_changes')}
          style={{
            backgroundColor: validateValues(validateOptions.value) ? mainColor : '#B3B3B3',
            borderRadius: 25,
          }}
        />
      </View>
    </View>
  );
};

export default EditDebtForm;
