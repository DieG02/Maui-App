import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import Spacer from '../../components/common/Spacer';
import customStyles from '../../styles/customStyles';
import CountryFlag from 'react-native-country-flag';
import TransactionCard from '../../components/Library/TransactionCard';
import EmptyState from '../../components/common/EmptyState';
import useGetMonthlyStats from '../../services/Balance/useMonthlyStats';
import useGetAccountTransactions from '../../services/Transactions/useGetAccountTransactions';
import useGetAllAccounts from '../../services/FinancialAccount/useGetAllAccounts';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { parserToCurrency } from '../../utils/adapter';
import AccountMenuModal from '../../components/Library/AccountMenu/AccountMenu';

import { queryClient } from '../../utils/queryClient';
import { GET_ALL_ACCOUNTS_KEY } from '../../services/FinancialAccount/useGetAllAccounts';
import { GET_ACCOUNT_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAccountTransactions';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import { GET_GENERAL_BALANCE_KEY } from '../../services/Balance/useGeneralBalance';
import { GET_MONTHLY_BALANCE_KEY } from '../../services/Balance/useGetMonthlyBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useMonthlyStats';
import useDeleteFinancialAccount from '../../services/FinancialAccount/useDeleteFinancialAccount';
import Toast from 'react-native-toast-message';

const { white, textBlack, background2, marginHorizontal, mainColor, iconColor } = customStyles;

interface AccountDetailProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const AccountDetail = ({ navigation, route }: AccountDetailProps) => {
  const { id } = route.params!;
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('account_stack.account_detail.toast_account_delete'),
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

  const { mutateAsync: deleteFinancialAccount, isLoading: isDeleting } = useDeleteFinancialAccount(id, {
    onSuccess() {
      setIsModalVisible(false);
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
      queryClient.invalidateQueries(GET_ALL_ACCOUNTS_KEY);
      queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
      queryClient.invalidateQueries(GET_ACCOUNT_TRANSACTIONS_KEY);
      queryClient.invalidateQueries(GET_MONTHLY_STATS_KEY);
      queryClient.invalidateQueries(GET_MONTHLY_BALANCE_KEY);
    },
  });

  const { data, isLoading: isFetchingAccounts } = useGetAllAccounts({
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const accountData = data!.financialAccounts.find(element => element.id === id)!;
  const {
    currency: { code, isoCode, locale },
    total_balance,
  } = accountData;

  if (isFetchingAccounts || isFetchingTransactions || isFetchingMonthlyStats || isDeleting)
    return <LoadingComponent color={mainColor} />;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackHeaderTitle label={''} onPressBack={navigation.goBack} />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name='reorder-three-outline' size={32} color={iconColor} />
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CountryFlag
            isoCode={isoCode}
            size={24}
            style={{
              width: 26,
              height: 26,
              borderRadius: 30,
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 20 }}>{code}</Text>
        </View>

        <Text style={styles.balance}>{parserToCurrency(total_balance, locale, code)}</Text>
        <View style={styles.cards}>
          <View style={[styles.card, styles.income]}>
            <View style={styles.label}>
              <View style={[styles.iconStyle, { backgroundColor: '#33E69B' }]}>
                <Ionicons name='ios-arrow-up-sharp' size={16} color={white} />
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Gilroy-Medium' }}>{t('balance_stack.sale')}</Text>
            </View>
            <Text style={styles.textCard}>{monthlyStats?.incomes}</Text>
          </View>
          <View style={[styles.card, styles.expense]}>
            <View style={styles.label}>
              <View style={[styles.iconStyle, { backgroundColor: '#FD6363' }]}>
                <Ionicons name='ios-arrow-down-sharp' size={16} color={white} />
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Gilroy-Medium' }}>{t('balance_stack.expense')}</Text>
            </View>
            <Text style={styles.textCard}>{monthlyStats?.expenses}</Text>
          </View>
        </View>

        <FlatList
          overScrollMode='never'
          data={transactionsByAccount}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          refreshing={false}
          onRefresh={() => {
            getMonthlyStats();
            getAccountTransactions();
          }}
          onEndReached={() => {
            getMonthlyStats();
            getAccountTransactions();
          }}
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
        onUpdate={() => {
          console.log('Set as default here!');
        }}
        onRedirect={() => {
          navigation.navigate('MonthlySummaries', { id });
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
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: marginHorizontal,
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
  },
  card: {
    backgroundColor: background2,
    borderRadius: 15,
    flex: 1,
    padding: 15,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconStyle: {
    width: 22,
    height: 22,
    borderRadius: 30,
    marginRight: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCard: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 24,
    color: textBlack,
  },
  income: {
    marginRight: 15,
  },
  expense: {},
});

export default AccountDetail;
