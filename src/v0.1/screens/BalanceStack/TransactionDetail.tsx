import { Image, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import RowTransaction from '../../components/common/TransactionCard/RowTransaction';
import Button from '../../components/common/Button';
import ScrollContainer from '../../components/containers/ScrollContainer';
import useDeleteExpense from '../../services/Expense/useDeleteExpense';
import useDeleteIncome from '../../services/Incomes/useDeleteIncome';
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

// TODO: Refactor this component
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const { secondaryColor, textBlack, marginHorizontal, mainColor, babyBlue } = customStyles;

const TransactionDetail = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { params } = route;
  const { handlePaymentName } = usePayment();
  const [contact, setContact] = useState(null);

  const { data: transaction, isLoading: isFetchingTransaction } = useGetTransactionById(params?.transactionId, {
    onSuccess(data) {
      if (!data.contact?.deletedAt) setContact(data.contact);
    },
  });

  const isExpense = transaction?.type === 'DEBIT';

  const showToast = () => {
    if (isExpense) {
      ToastAndroid.show(t('balance_stack.transaction_detail.toast_expense_delete'), ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(t('balance_stack.transaction_detail.toast_income_delete'), ToastAndroid.SHORT);
    }
  };

  const { mutateAsync: deleteExpense } = useDeleteExpense(params?.transactionId, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries('Transactions');
    },
  });

  const { mutateAsync: deleteIncome } = useDeleteIncome(params?.transactionId, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries('Transactions');
    },
  });

  const handleDelete = () => {
    alertDelete(t('balance_stack.transaction_detail.alert_delete'), isExpense ? deleteExpense : deleteIncome);
  };

  const handleOnPress = () => {
    isExpense
      ? navigation.navigate('EditExpense', { expense: transaction })
      : navigation.navigate('EditIncome', { income: transaction });
  };

  if (isFetchingTransaction) return <LoadingComponent color={mainColor} />;

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
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: secondaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          >
            <Image
              source={{ uri: transaction.category.image }}
              style={{
                width: 40,
                height: 40,
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
          value={t(handlePaymentName(transaction.payment_method))}
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
          value={transaction.category.name === 'Venta' ? t('balance_stack.sale') : t('balance_stack.expense')}
        />

        {transaction.category.name !== 'Venta' && (
          <RowTransaction
            label={t('balance_stack.transaction_detail.expense_category')}
            value={handleTranslateCategory(transaction.category.name, dictionary)}
          />
        )}
        {!contact ? null : (
          <ContactCard
            disabled
            data={contact}
            type={transaction.category.type === 'CREDIT' ? 'client' : 'provider'}
            onPress={() => {}}
            showNoRightIcon={true}
          />
        )}
      </ScrollContainer>
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
            backgroundColor: babyBlue,
            marginTop: 10,
          }}
          onPress={handleOnPress}
        />
      </View>
    </ScreenContainer>
  );
};

export default TransactionDetail;
