import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import { NavigationProp } from '@react-navigation/native';
import customStyles from '../../styles/customStyles';
import Spacer from '../../components/common/Spacer';
import moment from 'moment';
import { parserToCurrency } from '../../utils/adapter';
import useGetMonthlyBalance from '../../services/Balance/useGetMonthlyBalance';
import EmptyState from '../../components/common/EmptyState';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { IBalanceItem } from '../../types/types';

interface Props {
  navigation: NavigationProp<any, any>;
}

interface TabProps {
  id: number;
  balance: IBalanceItem;
}

const { textBlack, background2, positive, mainColor } = customStyles;

const MonthlySummariesScreen = ({ navigation }: Props) => {
  const [tabId, setTabId] = useState<number[]>([]);
  const { data, refetch: getMonthlyBalance, isLoading } = useGetMonthlyBalance();
  const { t, i18n } = useTranslation();

  const handlePress = (value: number) => {
    if (!tabId.includes(value)) {
      setTabId([...tabId, value]);
    } else {
      setTabId(tabId.filter(item => item !== value));
    }
  };

  if (isLoading || !data) return <LoadingComponent color={mainColor} />;

  const Tab = ({ balance, id }: TabProps) => {
    const date = moment(balance.month, 'M').locale(i18n.language).format('MMMM');

    return (
      <View style={{ marginBottom: 20, marginHorizontal: 30 }}>
        <TouchableOpacity
          onPress={() => handlePress(id)}
          style={{ backgroundColor: 'background2', paddingHorizontal: 20, paddingVertical: 16 }}
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
      <BackHeaderTitle
        label={'Balance'}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <Spacer height={10} />
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
