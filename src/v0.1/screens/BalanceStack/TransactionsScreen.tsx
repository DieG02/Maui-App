/* eslint-disable react/no-unstable-nested-components */
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import ScreenContainer from '../../components/containers/ScreenContainer';
import customStyles from '../../styles/customStyles';

import { useTranslation } from 'react-i18next';
import { Header } from '../../components/common/HeaderTitle';
import SearchBar from '../../components/common/SearchBar';
import TransactionCard from '../../components/Library/TransactionCard';
import useGetAllTransactions from '../../services/Transactions/useGetAllTransactions';
import { ITransactionDetail } from '../../types/types';

// TODO: Refactor this component
interface Props {
  navigation: NavigationProp<any, any>;
}

const { mainColor, width, marginHorizontal, background2 } = customStyles;

const TransactionsScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [text, onChangeText] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const { data, refetch: getAllTransactions } = useGetAllTransactions();

  const filterData = useMemo(() => {
    return data?.filter((item: ITransactionDetail) => item.description?.toLowerCase().startsWith(text.toLowerCase()));
  }, [data, text]);

  useFocusEffect(
    useCallback(() => {
      getAllTransactions();
    }, [getAllTransactions])
  );

  return (
    <ScreenContainer>
      {!isSearch ? (
        <>
          <Header
            label={t('balance_stack.transaction_screen.balance')}
            withSearch
            onPressSearch={() => setIsSearch(true)}
          />
        </>
      ) : (
        <SearchBar
          onChangeText={onChangeText}
          text={text}
          placeholder={t('balance_stack.transaction_screen.placeholder_search')}
          onPress={() => {
            onChangeText('');
            setIsSearch(false);
          }}
          onBlur={() => text.length === 0 && setIsSearch(false)}
        />
      )}
      <FlatList
        overScrollMode='never'
        data={filterData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        refreshing={false}
        onRefresh={() => {
          getAllTransactions();
        }}
        onEndReached={() => {
          getAllTransactions();
        }}
        style={{ marginHorizontal: marginHorizontal }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TransactionCard
            data={item}
            key={item.id}
            onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
          />
        )}
        ListEmptyComponent={() =>
          text.length !== 0 ? (
            <EmptyState title={t('balance_stack.transaction_screen.empty_result')} />
          ) : (
            <EmptyState title={t('balance_stack.transaction_screen.empty_transactions')} />
          )
        }
      />

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginBottom: 20,
          marginTop: 10,
          justifyContent: 'space-between',
        }}
      >
        <Button
          onPress={() => navigation.navigate('NewIncome')}
          text={t('balance_stack.new_income.new_income')}
          style={{
            backgroundColor: mainColor,
            width: (width - 60) / 2,
          }}
        />
        <Button
          onPress={() => navigation.navigate('NewExpense')}
          text={t('balance_stack.new_expense.new_expense')}
          color={mainColor}
          style={{
            backgroundColor: background2,
            width: (width - 60) / 2,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default TransactionsScreen;
