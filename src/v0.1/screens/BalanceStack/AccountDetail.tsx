import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CountryFlag from 'react-native-country-flag';
import AccountMenuModal from '../../components/Library/AccountMenu/AccountMenu';
import LoadingComponent from '../../components/Library/LoadingComponent';
import TransactionCard from '../../components/Library/TransactionCard';
import EmptyState from '../../components/common/EmptyState';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import customStyles from '../../styles/customStyles';
import { parserToCurrency } from '../../utils/adapter';

import useGetMonthlyStats from '../../services/Balance/useMonthlyStats';
import useDeleteFinancialAccount from '../../services/FinancialAccount/useDeleteFinancialAccount';
import useGetAllAccounts from '../../services/FinancialAccount/useGetAllAccounts';
import useGetAccountTransactions from '../../services/Transactions/useGetAccountTransactions';
import { queryClient } from '../../utils/queryClient';

import { GET_GENERAL_BALANCE_KEY } from '../../services/Balance/useGeneralBalance';
import { GET_MONTHLY_BALANCE_KEY } from '../../services/Balance/useGetMonthlyBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useMonthlyStats';
import useEditFinancialAccount, {
  PUT_FINANCIAL_ACCOUNT_KEY,
} from '../../services/FinancialAccount/useEditFinancialAcount';
import { GET_ALL_ACCOUNTS_KEY } from '../../services/FinancialAccount/useGetAllAccounts';
import { GET_ACCOUNT_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAccountTransactions';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';

const { white, textBlack, background2, marginHorizontal, mainColor, iconColor } = customStyles;

interface AccountDetailProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const AccountDetail = ({ navigation, route }: AccountDetailProps) => {
  const { id } = route.params!;
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showToast = (key: 'edit' | 'delete') => {
    Toast.show({
      type: 'success',
      text2: t(`account_stack.account_detail.toast_account_${key}`),
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  const {
    data: transactionsByAccount,
    isLoading: isFetchingTransactions,
    refetch: getAccountTransactions,
  } = useGetAccountTransactions(id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  const {
    data: monthlyStats,
    isLoading: isFetchingMonthlyStats,
    refetch: getMonthlyStats,
  } = useGetMonthlyStats(id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: editFinancialAccount, isLoading: isEditing } = useEditFinancialAccount(
    id,
    { mainAccount: true },
    {
      onSuccess: () => {
        showToast('edit');
        navigation.goBack();
        queryClient.invalidateQueries(PUT_FINANCIAL_ACCOUNT_KEY);
        queryClient.removeQueries([PUT_FINANCIAL_ACCOUNT_KEY, id]);
        queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
        queryClient.invalidateQueries(GET_ALL_ACCOUNTS_KEY);
        queryClient.invalidateQueries([GET_MONTHLY_STATS_KEY, id]);
        queryClient.invalidateQueries([GET_MONTHLY_BALANCE_KEY, id]);
      },
    }
  );

  const { mutateAsync: deleteFinancialAccount, isLoading: isDeleting } = useDeleteFinancialAccount(id, {
    onSuccess() {
      showToast('delete');
      navigation.goBack();
      queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
      queryClient.invalidateQueries(GET_ALL_ACCOUNTS_KEY);
      queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
      queryClient.removeQueries([GET_ACCOUNT_TRANSACTIONS_KEY, id]);
      queryClient.removeQueries([GET_MONTHLY_STATS_KEY, id]);
      queryClient.removeQueries([GET_MONTHLY_BALANCE_KEY, id]);
    },
  });

  const { data, isLoading: isFetchingAccounts } = useGetAllAccounts({
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const onRefresh = () => {
    getMonthlyStats();
    getAccountTransactions();
  };

  const accountData = data!.financialAccounts.find(element => element.id === id)!;
  const {
    currency: { code, isoCode, locale },
    accountName,
    total_balance,
  } = accountData;

  if (isFetchingAccounts || isFetchingTransactions || isFetchingMonthlyStats || isDeleting || isEditing)
    return <LoadingComponent color={mainColor} />;

  return (
    <ScreenContainer>
      <View style={styles.nav}>
        <BackHeaderTitle label={''} onPressBack={navigation.goBack} />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name='reorder-three-outline' size={32} color={iconColor} />
        </TouchableOpacity>
      </View>

      <Spacer height={10} />
      <View style={styles.container}>
        <View style={styles.header}>
          <CountryFlag isoCode={isoCode} size={24} style={styles.header_icon} />
          <Text style={{ fontSize: 20 }}>{accountName}</Text>
        </View>

        <Text style={styles.balance}>{parserToCurrency(total_balance, locale, code)}</Text>

        <View style={styles.cards}>
          <View style={styles.card}>
            <View style={styles.card_label}>
              <View style={[styles.card_icon, { backgroundColor: '#33E69B' }]}>
                <Ionicons name='ios-arrow-up-sharp' size={16} color={white} />
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Gilroy-Medium' }}>{t('balance_stack.sale')}</Text>
            </View>
            <Text style={styles.card_value}>{monthlyStats?.incomes}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.card_label}>
              <View style={[styles.card_icon, { backgroundColor: '#FD6363' }]}>
                <Ionicons name='ios-arrow-down-sharp' size={16} color={white} />
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Gilroy-Medium' }}>{t('balance_stack.expense')}</Text>
            </View>
            <Text style={styles.card_value}>{monthlyStats?.expenses}</Text>
          </View>
        </View>

        <FlatList
          overScrollMode='never'
          data={transactionsByAccount}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={onRefresh}
          onEndReached={onRefresh}
          style={{ marginTop: marginHorizontal }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <TransactionCard
              data={item}
              key={item.id}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              style={{ marginTop: '-20%' }}
              title={t('balance_stack.transaction_screen.empty_transactions')}
            />
          }
        />
      </View>

      <AccountMenuModal
        account={accountData}
        isModalVisible={isModalVisible}
        onUpdate={editFinancialAccount}
        onRedirect={() => {
          navigation.navigate('balance', { id });
        }}
        onDelete={deleteFinancialAccount}
        setModalVisible={setIsModalVisible}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: marginHorizontal,
  },
  nav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: marginHorizontal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  header_icon: {
    width: 26,
    height: 26,
    borderRadius: 30,
  },
  balance: {
    fontSize: 42,
    marginVertical: 20,
    color: textBlack,
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
  },
  cards: {
    flexDirection: 'row',
    gap: 15,
  },
  card: {
    backgroundColor: background2,
    borderRadius: 15,
    flex: 1,
    padding: 15,
    gap: 10,
  },
  card_label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  card_icon: {
    width: 22,
    height: 22,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_value: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 24,
    color: textBlack,
  },
});

export default AccountDetail;
