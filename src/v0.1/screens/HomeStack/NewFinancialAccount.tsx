import { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Button from '../../components/common/Button';
import CommonInput from '../../components/common/CommonInput';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import CurrencySelect from '../../components/common/Modals/CountrySelect';
import Spacer from '../../components/common/Spacer';
import Toggle from '../../components/common/Toggle';
import ScreenContainer from '../../components/containers/ScreenContainer';
import Form from '../../components/Library/Form';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { GET_GENERAL_BALANCE_KEY } from '../../services/Balance/useGeneralBalance';
import useGetCurrencies from '../../services/Currency/useGetCurrencies';
import useCreateFinancialAccount from '../../services/FinancialAccount/useCreateFinancialAccount';
import useGetAllAccounts, { GET_ALL_ACCOUNTS_KEY } from '../../services/FinancialAccount/useGetAllAccounts';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import customStyles from '../../styles/customStyles';
import { queryClient } from '../../utils/queryClient';

const { mainColor, textBlack, disabled, marginHorizontal, white } = customStyles;

const defaultAccount = {
  accountName: '',
  mainAccount: false,
  currency: { value: '', label: '' },
  amount: '',
};

interface Props {
  navigation: NavigationProp<any, any>;
}

const NewFinancialAccount = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { data } = useGetCurrencies();

  const { data: accounts, refetch: refetchFinancialAccounts } = useGetAllAccounts();

  const [selectedCountry, setSelectedCountry] = useState<string>();

  const [form, setForm] = useState<any>(defaultAccount);
  const currencies = data?.map(item => ({ id: item.id, name: item.code, isoCode: item.isoCode }));
  const updateForm = (field: string, value: any) =>
    setForm((prev: any) => {
      return {
        ...prev,
        [field]: value,
      };
    });

  console.log('CURRENCIES', JSON.stringify(currencies, null, 2));
  console.log('SELECTED COUNTRY', selectedCountry);

  const formValidation = !!(form.accountName && selectedCountry);
  const { mutateAsync: createNewAccount, isLoading: isCreating } = useCreateFinancialAccount({
    onError: err => {
      console.error(err);
      setForm(defaultAccount);
      // INSERT TOAST HERE
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(GET_ALL_ACCOUNTS_KEY);
      queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
      queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
      refetchFinancialAccounts();
      navigation.goBack();
    },
  });

  if (isCreating) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <BackHeaderTitle
        onPressBack={() => navigation.goBack()}
        label={t('home_stack.accounts.add_new_account_title')}
        color={textBlack}
      />
      <Spacer height={10} />
      <Form>
        <CurrencySelect
          name={t('home_stack.accounts.currency_label')}
          selectedOption={String(selectedCountry)}
          setSelectedOption={setSelectedCountry}
          withSearch
          withPlaceholder
          placeholder={t('home_stack.accounts.currency_placeholder')}
          options={currencies ? currencies : []}
        />
        <Spacer height={15} />
        <CommonInput
          placeholder={t('home_stack.accounts.amount_placeholder')}
          name={t('home_stack.accounts.amount_label')}
          marginBottom={15}
          value={form.amount}
          keyboardType='number-pad'
          setValue={val => {
            const newValue = !!val && val !== 'NaN' ? val : '';
            updateForm('amount', newValue);
          }}
        />
        <CommonInput
          placeholder={t('home_stack.accounts.name_placeholder')}
          name={t('home_stack.accounts.name_label')}
          required
          marginBottom={15}
          value={form.accountName}
          setValue={value => updateForm('accountName', value)}
        />

        <Toggle
          value={form.mainAccount}
          onValueChange={value => updateForm('mainAccount', value)}
          label={t('home_stack.accounts.set_default_account')}
        />
      </Form>

      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginBottom: 40,
        }}
      >
        <Button
          disabled={!formValidation}
          onPress={() =>
            createNewAccount({
              data: {
                businessId: accounts?.financialAccounts[0].businessId,
                accountName: form.accountName,
                mainAccount: form.mainAccount,
                amount: form.amount,
                currencyId: currencies?.find(item => item.isoCode === selectedCountry)?.id,
              },
            })
          }
          text={t('home_stack.accounts.add_button')}
          color={white}
          style={{ backgroundColor: formValidation ? mainColor : disabled }}
        />
      </View>
    </ScreenContainer>
  );
};

export default NewFinancialAccount;
