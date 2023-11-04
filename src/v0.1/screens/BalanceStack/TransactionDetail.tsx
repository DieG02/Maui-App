import { Image, Text, ToastAndroid, View } from 'react-native';
import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import RowTransaction from '../../components/common/TransactionCard/RowTransaction';
import Button from '../../components/common/Button';
import ScrollContainer from '../../components/containers/ScrollContainer';
import { queryClient } from '../../utils/queryClient';
import { parseDDMMYY } from '../../utils/helper';
import ContactCard from '../../components/common/ContactCard';
import { alertDelete } from '../../utils/alerts';
import { useTranslation } from 'react-i18next';
import { handleTranslateCategory } from '../../utils/handleTranslateCategory';
import { dictionary } from '../../helpers/dictionary';
import usePayment from '../../hooks/usePayment';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useGetTransactionById from '../../services/Transactions/useGetTransactionById';
import useDeleteTransaction from '../../services/Transactions/useDeleteTransaction';

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
    ToastAndroid.show(t('balance_stack.transaction_detail.toast_transaction_delete'), ToastAndroid.SHORT);
  };

  const { mutateAsync: deleteTransaction, isLoading } = useDeleteTransaction(params?.transactionId, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries('Transactions');
      queryClient.invalidateQueries('Balance');
      queryClient.invalidateQueries('Monthly_Stats');
      queryClient.invalidateQueries('Debts');
      queryClient.invalidateQueries('Debt');
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

  if (isFetchingTransaction || isLoading) return <LoadingComponent color={mainColor} />;

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
              ? `${transaction.total_amount.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}`
              : `-${transaction.total_amount.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}`
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
