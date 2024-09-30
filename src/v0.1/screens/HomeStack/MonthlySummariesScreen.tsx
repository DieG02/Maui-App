import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EmptyState from '../../components/common/EmptyState';
import { Header } from '../../components/common/HeaderTitle';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import BalanceCard from '../../components/Library/BalanceCard';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useGetMonthlyBalance from '../../services/Balance/useGetMonthlyBalance';
import useGetAllAccounts from '../../services/FinancialAccount/useGetAllAccounts';
import customStyles from '../../styles/customStyles';
import { IBalanceItem, IFinancialAccount } from '../../types/types';
import { parserToCurrency } from '../../utils/adapter';

interface TabProps {
  id: number;
  balance: IBalanceItem;
}

const { textBlack, background2, positive, mainColor, width, marginHorizontal } = customStyles;

const MonthlySummariesScreen = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAllAccounts();

  const multipleAccounts = Number(accounts?.financialAccounts.length) > 1;

  const mainAccountId = String(accounts?.financialAccounts.find(account => account.mainAccount)?.id);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(mainAccountId);

  useEffect(() => {
    if (mainAccountId && !isLoadingAccounts) {
      setSelectedAccountId(mainAccountId);
    }
  }, [mainAccountId, isLoadingAccounts]);

  const [tabId, setTabId] = useState<number[]>([]);
  const { data, refetch: getMonthlyBalance, isLoading } = useGetMonthlyBalance(selectedAccountId);
  const { t, i18n } = useTranslation();

  const handlePress = (value: number) => {
    if (!tabId.includes(value)) {
      setTabId([...tabId, value]);
    } else {
      setTabId(tabId.filter(item => item !== value));
    }
  };

  if (isLoading || !data || isLoadingAccounts) return <LoadingComponent color={mainColor} />;

  const Tab = ({ balance, id }: TabProps) => {
    const date = moment(balance.month, 'M').locale(i18n.language).format('MMMM');

    return (
      <View style={{ marginBottom: 20, marginHorizontal: 30 }}>
        <TouchableOpacity
          onPress={() => handlePress(id)}
          style={{ backgroundColor: background2, paddingHorizontal: 20, paddingVertical: 16 }}
        >
          <Text style={{ color: textBlack, fontFamily: 'Gilroy-SemiBold', fontSize: 18 }}>
            {date[0].toUpperCase() + date.slice(1)} {balance.year}
          </Text>
        </TouchableOpacity>
        {tabId.includes(id) && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderWidth: 2, borderColor: background2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-Medium', fontWeight: '300', fontSize: 16 }}>
                {t('home_stack.monthly_balance.previous_balance')}
              </Text>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-Medium', fontWeight: '300', fontSize: 16 }}>
                {parserToCurrency(balance?.previousBalance, data.currency.locale, data.currency.code)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                {t('home_stack.monthly_balance.incomes')}
              </Text>
              <Text style={{ color: positive, fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                {balance?.incomes
                  ? parserToCurrency(balance.incomes, data.currency.locale, data.currency.code)
                  : parserToCurrency(0, data.currency.locale, data.currency.code)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                {t('home_stack.monthly_balance.expenses')}
              </Text>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                {balance?.expenses
                  ? parserToCurrency(balance.expenses, data.currency.locale, data.currency.code)
                  : parserToCurrency(0, data.currency.locale, data.currency.code)}
              </Text>
            </View>
            <View style={{ width: '100%', borderTopColor: background2, borderTopWidth: 2, marginVertical: 7 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                {t('home_stack.monthly_balance.total')}
              </Text>
              <Text style={{ color: textBlack, fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                {balance?.total
                  ? parserToCurrency(balance.total, data.currency.locale, data.currency.code)
                  : parserToCurrency(0, data.currency.locale, data.currency.code)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <Header label={t('home_stack.monthly_balance.history_balance')} />
      <Spacer height={10} />
      {multipleAccounts && (
        <View style={{ marginBottom: 40 }}>
          <ScrollView
            horizontal
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            snapToInterval={width / 1.5 + 15}
            decelerationRate={0.5}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {accounts?.financialAccounts.map((account: IFinancialAccount, i: number) => {
                return (
                  <BalanceCard
                    selected={account.id === selectedAccountId}
                    key={account.id}
                    account={account}
                    onPress={() => setSelectedAccountId(account.id)}
                    left={i === 0 ? marginHorizontal : 15}
                    right={i === accounts.financialAccounts.length - 1 ? 30 : 0}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}

      <FlatList
        data={data.balance}
        renderItem={({ item, index }) => <Tab key={index} id={index} balance={item} />}
        refreshing={false}
        onRefresh={() => getMonthlyBalance()}
        onEndReached={() => getMonthlyBalance()}
        ListEmptyComponent={() => <EmptyState title={t('home_stack.monthly_balance.empty_balance')} />}
      />
    </ScreenContainer>
  );
};

export default MonthlySummariesScreen;
