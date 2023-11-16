import { View, FlatList } from 'react-native';
import customStyles from '../../styles/customStyles';
import DebtsCard from '../../components/Library/DebtsCard/DebtsCard';
import { useNavigation } from '@react-navigation/native';
import TransactionCard from '../../components/Library/TransactionCard/TransactionCard';
import EmptyState from '../../components/common/EmptyState';
import { useTranslation } from 'react-i18next';

const { background } = customStyles;

interface Props {
  data?: any[];
  type: 'debt' | 'payment';
}

const DebtTypes = ({ data, type }: Props) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
        paddingVertical: 20,
      }}
    >
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <EmptyState title={t('balance_stack.transaction_screen.empty_transactions')} percentage={0.5} />
        )}
        renderItem={({ item }) =>
          type === 'debt' ? (
            <DebtsCard
              data={item?.transactions[0]}
              actualAmount={item?.total_amount}
              type={type}
              onPress={() =>
                navigation.navigate('DebtDetail', {
                  id: item?.transactions[0].id,
                  type: type,
                  actualAmount: item?.total_amount,
                })
              }
            />
          ) : (
            <TransactionCard
              data={item}
              key={item.id}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
            />
          )
        }
      />
    </View>
  );
};

export default DebtTypes;
