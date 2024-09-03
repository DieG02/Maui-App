import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import EmptyState from '../../common/EmptyState';
import styles from './style';
import TransactionCard from '../TransactionCard';
import { useTranslation } from 'react-i18next';

// TODO: Refactor this interface to use the correct types
interface Props {
  data: any;
  navigation: NavigationProp<any, any>;
}

// TODO: Refactor this component to make it more efficient
const TransactionsContainer = ({ data, navigation }: Props) => {
  const { t } = useTranslation();

  if (!data?.length) return null;
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {data?.length !== 0 ? (
          data?.map((item: any) => (
            <TransactionCard
              data={item}
              key={item.id}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
            />
          ))
        ) : (
          <EmptyState title={t('balance_stack.transaction_screen.empty_transactions')} percentage={0.7} />
        )}
      </View>
    </View>
  );
};

export default TransactionsContainer;
