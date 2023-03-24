import SummaryDebt from "../../components/common/SummaryDebt";
import { View, FlatList, RefreshControl } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { useNavigation } from "@react-navigation/native";
import useRefresh from "../../hooks/useRefresh";
import useGetExpenseDebts from "../../services/Expenses/useGetExpenseDebt";
import { useCallback } from 'react'
import EmptyState from "../../components/common/EmptyState";

const { background, mainColor } = customStyles;

const ExpenseDebt = () => {
  const { push } = useNavigation<any>()
  const { data: expenses, refetch } = useGetExpenseDebts()
  const total = useCallback(() => {
    let total = 0
    expenses?.map(debt => total += debt.totalPrice)
    return total
  }, [expenses])
  const { refreshing, handleRefresh } = useRefresh(refetch)

  return (
    <View style={{
      flex: 1,
      backgroundColor: background,
    }}>
      <View style={{
        marginTop: 20,
        backgroundColor: background,
        flex: 1
      }}>
        <FlatList data={expenses}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[mainColor]}
            />}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <DebtContactCard
              type="provider"
              onPress={() => push("DebtorScreen", { expenseId: item.id, name: item.providerName })}
              name={item.providerName}
              date={item.startingDate}
              sales={item.sales}
              totalPrice={item.totalPrice} />}
          ListEmptyComponent={<EmptyState title='No tienes deudas' />} />
      </View>
      <SummaryDebt
        type="expense"
        amount={total()}
        stakeholders={expenses?.length || 0}
      />
    </View>
  );
};

export default ExpenseDebt;