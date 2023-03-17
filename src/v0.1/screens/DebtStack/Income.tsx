import { useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SummaryDebt from "../../components/common/SummaryDebt";
import DebtContactCard from "../../components/common/DebtContactCard";
import customStyles from "../../styles/customStyles";
import useRefresh from "../../hooks/useRefresh";
import useGetIncomeDebts from "../../services/Incomes/useGetIcomeDebts";
import EmptyState from "../../components/common/EmptyState";

const { background, mainColor } = customStyles;

const IncomeDebt = () => {
  const { navigate } = useNavigation<any>();
  const { data: income, refetch } = useGetIncomeDebts()
  const total = useCallback(() => {
    let total = 0
    income?.map(debt => total += debt.totalPrice)
    return total
  }, [income])
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
        <FlatList data={income}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[mainColor]}
            />}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <DebtContactCard
              type="client"
              onPress={() => navigate("DebtorScreen", { incomeId: item.id, name: item.clientName })}
              name={item.clientName}
              date={item.startingDate}
              sales={item.sales}
              totalPrice={item.totalPrice} />}
          ListEmptyComponent={<EmptyState title='No tienes deudas' />} />
      </View>
      <SummaryDebt
        type="income"
        amount={total()}
        stakeholders={income?.length || 0}
      />
    </View>
  );
};

export default IncomeDebt;