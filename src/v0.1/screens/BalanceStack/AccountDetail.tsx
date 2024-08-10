import { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import Spacer from '../../components/common/Spacer';
import customStyles from '../../styles/customStyles';
import CountryFlag from 'react-native-country-flag';
import { useTranslation } from 'react-i18next';
import useGetTransactions from '../../services/Transactions/useGetAllTransactions';
import TransactionCard from '../../components/Library/TransactionCard';
import EmptyState from '../../components/common/EmptyState';
import useGetMonthlyStats from '../../services/Balance/useGetStats';

const { white, textBlack, background2, marginHorizontal } = customStyles;

interface AccountDetailProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const AccountDetail = ({ navigation, route }: AccountDetailProps) => {
  const { params } = route;
  const {
    accountName,
    currency: { code, isoCode },
    total_balance,
  } = params!.account;

  const { t } = useTranslation();
  const { data, refetch: getAllTransactions } = useGetTransactions();
  const { data: stateBalance, refetch: getMonthlyStats } = useGetMonthlyStats();

  useFocusEffect(
    useCallback(() => {
      getMonthlyStats();
      getAllTransactions();
    }, [])
  );

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={''}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
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

        <Text style={styles.balance}>{`$ ${total_balance}`}</Text>
        <View style={styles.cards}>
          <View style={[styles.card, styles.income]}>
            <View style={styles.label}>
              <View style={[styles.iconStyle, { backgroundColor: '#33E69B' }]}>
                <Ionicons name='ios-arrow-up-sharp' size={16} color={white} />
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Gilroy-Medium' }}>{t('balance_stack.sale')}</Text>
            </View>
            <Text style={styles.textCard}>{stateBalance?.incomes}</Text>
          </View>
          <View style={[styles.card, styles.expense]}>
            <View style={styles.label}>
              <View style={[styles.iconStyle, { backgroundColor: '#FD6363' }]}>
                <Ionicons name='ios-arrow-down-sharp' size={16} color={white} />
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Gilroy-Medium' }}>{t('balance_stack.expense')}</Text>
            </View>
            <Text style={styles.textCard}>{stateBalance?.expenses}</Text>
          </View>
        </View>

        <FlatList
          overScrollMode='never'
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          refreshing={false}
          onRefresh={() => {
            getAllTransactions();
          }}
          onEndReached={() => {
            getAllTransactions();
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
          ListEmptyComponent={<EmptyState title={t('balance_stack.transaction_screen.empty_transactions')} />}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: marginHorizontal,
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
