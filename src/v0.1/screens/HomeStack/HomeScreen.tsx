import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Spacer from '../../components/common/Spacer';
import customStyles from '../../styles/customStyles';
import ScreenContainer from '../../components/containers/ScreenContainer';
import ProfileComponent from '../../components/Library/ProfileComponent';
import Title from '../../components/Library/Title';
import GeneralBalance from '../../components/Library/GeneralBalance';
import StateBalance from '../../components/Library/StateBalance';
import TransactionsContainer from '../../components/Library/TransactionsContainer';
import useGetAllTransactions from '../../services/Transactions/useGetAllTransactions';
import useGetMonthlyStats from '../../services/Balance/useMonthlyStats';
import useGetAccount from '../../services/Account/useGetAccount';
import MultipleAccounts from '../../components/Library/MultipleAccounts';
import useGetAllAccounts from '../../services/FinancialAccount/useGetAllAccounts';
import useGeneralBalance from '../../services/Balance/useGeneralBalance';

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [singleAccount, setSingleAccount] = useState<boolean>(true);
  const { data: user } = useGetAccount();
  const { data: transactions, refetch: getTransactionsFromHome } = useGetAllTransactions({ take: 6 });

  const { data: general_balance, refetch: getGeneralBalance } = useGeneralBalance();
  const { data: { financialAccounts } = { financialAccounts: [] }, refetch: getFinancialAccounts } = useGetAllAccounts({
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { data: monthlyStats, refetch: getMonthlyStats } = useGetMonthlyStats('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (financialAccounts.length === 1) {
      getMonthlyStats(financialAccounts[0].id as any);
    }
    setSingleAccount(financialAccounts.length === 1);
  }, [financialAccounts, getMonthlyStats]);

  const onRefresh = () => {
    setRefreshing(true);
    getTransactionsFromHome();
    getGeneralBalance();
    getFinancialAccounts();
    setRefreshing(false);
  };

  return (
    <ScreenContainer>
      <ScrollView
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[mainColor]} />}
      >
        <ProfileComponent user={user} onPressUser={() => navigation.navigate('More')} />
        <Spacer height={20} />
        <GeneralBalance data={general_balance} multiple={!singleAccount} navigation={navigation} />
        <Spacer height={20} />
        <Title title={t('home_stack.monthly_summary.title')} />
        <Spacer height={20} />
        {singleAccount ? <StateBalance data={monthlyStats!} /> : <MultipleAccounts data={financialAccounts!} />}
        <Spacer height={20} />
        <Title
          title={t('home_stack.last_records')}
          label={t('home_stack.see_more')}
          enable={transactions?.length !== 0}
          onPress={() => navigation.navigate('transactions')}
        />
        <Spacer height={10} />
        <TransactionsContainer data={transactions} navigation={navigation} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
