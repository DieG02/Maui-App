import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/common/Button';
import ContactCard from '../../components/common/ContactCard';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import RowTransaction from '../../components/common/RowTransaction';
import ScreenContainer from '../../components/containers/ScreenContainer';
import ScrollContainer from '../../components/containers/ScrollContainer';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { dictionary } from '../../helpers/dictionary';
import usePayment from '../../hooks/usePayment';
import { GET_BALANCE_KEY } from '../../services/Balance/useGetBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useGetStats';
import { GET_DEBTS_KEY } from '../../services/Debts/useGetAllDebts';
import { GET_DEBT_KEY } from '../../services/Debts/useGetDebtsById';
import useDeleteTransaction from '../../services/Transactions/useDeleteTransaction';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import useGetTransactionById from '../../services/Transactions/useGetTransactionById';
import customStyles from '../../styles/customStyles';
import { parserToCurrency } from '../../utils/adapter';
import { alertDelete } from '../../utils/alerts';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import { parseDDMMYY } from '../../utils/helper';
import { queryClient } from '../../utils/queryClient';

// TODO: Refactor this component
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const { secondaryColor, textBlack, marginHorizontal, mainColor, background2 } = customStyles;

const TransactionDetail = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { params } = route;
  const { handlePayment } = usePayment();

  const { data: transaction, isLoading: isFetchingTransaction } = useGetTransactionById(params?.transactionId, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const isExpense = transaction?.type === 'DEBIT';

  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('balance_stack.transaction_detail.toast_transaction_delete'),
      position: 'bottom',
      visibilityTime: 1000,
    });
  };

  const { mutateAsync: deleteTransaction, isLoading } = useDeleteTransaction(params?.transactionId, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
      queryClient.invalidateQueries(GET_BALANCE_KEY);
      queryClient.invalidateQueries(GET_MONTHLY_STATS_KEY);
      queryClient.invalidateQueries(GET_DEBTS_KEY);
      queryClient.invalidateQueries(GET_DEBT_KEY);
    },
  });

  const handleDelete = () => {
    alertDelete(t('balance_stack.transaction_detail.alert_delete'), deleteTransaction);
  };

  const handleOnPress = () => {
    isExpense
      ? navigation.navigate('EditExpense', { expense: transaction })
      : navigation.navigate('EditIncome', { income: transaction });
  };

  if (isFetchingTransaction || isLoading || !transaction) return <LoadingComponent color={mainColor} />;

  const locale = transaction.financialAccount.currency.locale;
  const code = transaction.financialAccount.currency.code;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('balance_stack.transaction_detail.details')}
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={handleDelete}
      />
      <ScrollContainer>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 70,
              backgroundColor: secondaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          >
            <Image
              source={{ uri: transaction.category.image }}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              color: textBlack,
              fontFamily: 'Gilroy-SemiBold',
            }}
          >
            {transaction.description}
          </Text>
        </View>

        <RowTransaction
          label={t('balance_stack.transaction_detail.transaction_date')}
          value={parseDDMMYY(transaction.date)}
        />
        <RowTransaction
          label={t('balance_stack.transaction_detail.payment_method')}
          value={handlePayment(transaction.payment_method)}
        />
        <RowTransaction
          label={t('balance_stack.transaction_detail.total')}
          value={
            transaction.category.name === 'Venta'
              ? `${parserToCurrency(transaction.total_amount, locale, code)}`
              : `-${parserToCurrency(transaction.total_amount, locale, code)}`
          }
        />
        <RowTransaction
          label={t('balance_stack.transaction_detail.transaction_type')}
          value={transaction.type === 'CREDIT' ? t('balance_stack.sale') : t('balance_stack.expense')}
        />

        {transaction.category.group !== 'PAYMENT' && transaction.category.name !== 'Venta' && (
          <RowTransaction
            label={t('balance_stack.transaction_detail.expense_category')}
            value={handleTranslateCategory(transaction.category.name, dictionary)}
          />
        )}
        {transaction.contact && (
          <ContactCard
            disabled
            data={transaction.contact}
            type={transaction.category.type === 'CREDIT' ? 'client' : 'provider'}
            onPress={() => {}}
            showNoRightIcon={true}
          />
        )}
      </ScrollContainer>
      {transaction.category.group !== 'PAYMENT' && (
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: marginHorizontal,
            marginBottom: 40,
          }}
        >
          <Button
            text={t('balance_stack.transaction_detail.edit')}
            color={mainColor}
            style={{
              backgroundColor: background2,
              marginTop: 10,
            }}
            onPress={handleOnPress}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

export default TransactionDetail;
