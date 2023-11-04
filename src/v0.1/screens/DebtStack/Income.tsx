import { useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SummaryDebt from '../../components/common/SummaryDebt';
import DebtContactCard from '../../components/common/DebtContactCard';
import customStyles from '../../styles/customStyles';
import useRefresh from '../../hooks/useRefresh';
import EmptyState from '../../components/common/EmptyState';
import LoadingComponent from '../../components/Library/LoadingComponent/LoadingComponent';
import { useTranslation } from 'react-i18next';
import useGetAllDebts from '../../services/Debts/useGetAllDebts';

const { background, mainColor } = customStyles;

const IncomeDebt = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<any>();
  const { data: debts, isLoading, refetch } = useGetAllDebts();
  const { refreshing, handleRefresh } = useRefresh(refetch);

  const total = useCallback(() => {
    let total = 0;
    debts?.incomes?.map(debt => (total += debt.totalToPay));
    return total;
  }, [debts]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      {debts.incomes?.length !== 0 && (
        <SummaryDebt type='income' amount={total()} stakeholders={debts?.incomes?.length || 0} />
      )}

      {isLoading ? (
        <LoadingComponent color={mainColor} />
      ) : (
        <View
          style={{
            marginTop: 15,
            backgroundColor: background,
            flex: 1,
          }}
        >
          <FlatList
            data={debts?.incomes}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[mainColor]} />}
            keyExtractor={item => item.contactId}
            renderItem={({ item }) => (
              <DebtContactCard
                type='client'
                onPress={() =>
                  navigate('DebtorScreen', {
                    contactId: item.contactId,
                  })
                }
                name={item.contactName}
                date={item.initialDate}
                sales={item.amountDebts}
                totalPrice={item.totalToPay}
              />
            )}
            ListEmptyComponent={<EmptyState title={t('debt_stack.income_debt.empty_debts')} />}
          />
        </View>
      )}
    </View>
  );
};

export default IncomeDebt;
