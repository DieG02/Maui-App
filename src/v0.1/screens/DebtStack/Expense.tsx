import SummaryDebt from '../../components/common/SummaryDebt';
import { View, FlatList, RefreshControl } from 'react-native';
import customStyles from '../../styles/customStyles';
import DebtContactCard from '../../components/common/DebtContactCard';
import { useNavigation } from '@react-navigation/native';
import useRefresh from '../../hooks/useRefresh';
import { useCallback } from 'react';
import EmptyState from '../../components/common/EmptyState';
import LoadingComponent from '../../components/Library/LoadingComponent/LoadingComponent';
import { useTranslation } from 'react-i18next';
import useGetAllDebts from '../../services/Debts/useGetAllDebts';

const { background, mainColor } = customStyles;

const ExpenseDebt = () => {
  const { t } = useTranslation();
  const { push } = useNavigation<any>();
  const { data: debts, isLoading, refetch } = useGetAllDebts();
  const { refreshing, handleRefresh } = useRefresh(refetch);

  const total = useCallback(() => {
    let total = 0;
    debts?.expenses?.map(debt => (total += debt.totalToPay));
    return total;
  }, [debts]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      {isLoading ? (
        <LoadingComponent color={mainColor} />
      ) : (
        <View
          style={{
            marginTop: 20,
            backgroundColor: background,
            flex: 1,
          }}
        >
          <FlatList
            data={debts?.expenses}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[mainColor]} />}
            keyExtractor={item => item.contactId}
            renderItem={({ item }) => (
              <DebtContactCard
                type='provider'
                onPress={() =>
                  push('DebtorScreen', {
                    expenseId: item.contactId,
                    name: item.contactName,
                  })
                }
                name={item.contactName}
                date={item.initialDate}
                sales={item.amountDebts}
                totalPrice={item.totalToPay}
              />
            )}
            ListEmptyComponent={<EmptyState title={t('debt_stack.expense_debt.empty_debts')} />}
          />
          <SummaryDebt type='expense' amount={total()} stakeholders={debts?.expenses?.length || 0} />
        </View>
      )}
    </View>
  );
};

export default ExpenseDebt;
