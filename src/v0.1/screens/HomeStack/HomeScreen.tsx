import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';

import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import GeneralBalance from '../../components/Library/GeneralBalance';
import MultipleAccounts from '../../components/Library/MultipleAccounts';
import ProfileComponent from '../../components/Library/ProfileComponent';
import StateBalance from '../../components/Library/StateBalance';
import Title from '../../components/Library/Title';
import TransactionsContainer from '../../components/Library/TransactionsContainer';

import { Capabilities, SubscriptionContext } from '../../context/SubscriptionContext';
import useGetAccount from '../../services/Account/useGetAccount';
import useGeneralBalance from '../../services/Balance/useGeneralBalance';
import useGetMonthlyStats from '../../services/Balance/useMonthlyStats';
import useGetAllAccounts from '../../services/FinancialAccount/useGetAllAccounts';
import useGetAllTransactions from '../../services/Transactions/useGetAllTransactions';
import customStyles from '../../styles/customStyles';

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [singleAccount, setSingleAccount] = useState<boolean>(true);
  const { data: user } = useGetAccount();
  const { data: transactions, refetch: getTransactionsFromHome } = useGetAllTransactions({ take: 6 });

  const { subscriptionCapabilities } = useContext(SubscriptionContext);

  const multipleFinancialAccounts = subscriptionCapabilities.find(
    capability => capability.name === Capabilities.MULTIPLE_FINANCIAL_ACCOUNTS
  );

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
        <GeneralBalance
          data={general_balance}
          limit={Number(multipleFinancialAccounts?.limit)}
          multiple={!!multipleFinancialAccounts?.value}
          amountAccounts={financialAccounts.length}
          navigation={navigation}
        />
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
