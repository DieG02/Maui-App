import { useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import SummaryDebt from "../../components/common/SummaryDebt";
import DebtContactCard from "../../components/common/DebtContactCard";
import customStyles from "../../styles/customStyles";
import { getAllIncomeDebts } from "../../services/debts";
import useRefresh from "../../hooks/useRefresh";

const { background, mainColor } = customStyles;

const IncomeDebt = () => {
  const { navigate } = useNavigation<any>();
  const [income, setIncomes] = useState<IDebtContact[]>([]);
  const [summary, setSummary] = useState<Summary>();

  const { refetch } = useQuery("clients", getAllIncomeDebts, {
    onSuccess(data: IncomeDebt[]) {
      let total = 0;
      const parser = data.map((debt): IDebtContact => {
        total += debt.totalPrice;
        return {
          id: debt.id,
          name: debt.clientName,
          sales: debt.sales,
          date: debt.startingDate,
          totalPrice: debt.totalPrice
        }
      });
      setSummary({
        amount: total,
        stakeholders: data.length
      });
      setIncomes(parser);
    },
  });
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[mainColor]}
            />
          }
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <DebtContactCard
              type="client"
              onPress={() => navigate("DebtorScreen", { incomeId: item.id, name: item.name })}
              name={item.name}
              date={item.date}
              purchases={item.purchases as string}
              sales={item.sales}
              totalPrice={item.totalPrice} />
          } />
      </View>
      {summary && (
        <SummaryDebt
          type="income"
          amount={summary?.amount}
          stakeholders={summary?.stakeholders}
        />
      )}
    </View>
  );
};

export default IncomeDebt;