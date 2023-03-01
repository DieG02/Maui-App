import React, { useState } from "react";
import SummaryDebt from "../../components/common/SummaryDebt";
import { View, FlatList, RefreshControl } from "react-native";
import { useQuery } from "react-query";
import { getAllExpenseDebts } from "../../services/debts";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { useNavigation } from "@react-navigation/native";
import useRefresh from "../../hooks/useRefresh";

const { background, mainColor } = customStyles;

const ExpenseDebt = () => {
  const { push } = useNavigation<any>();
  const [expenses, setExpenses] = useState<IDebtContact[]>([]);
  const [summary, setSummary] = useState<Summary>();

  const { refetch } = useQuery("expenseDebts", getAllExpenseDebts, {
    onSuccess(data: ExpenseDebt[]) {
      let total = 0;
      const parser = data.map((debt): IDebtContact => {
        total += debt.totalPrice;
        return {
          id: debt.id,
          name: debt.providerName,
          sales: debt.sales,
          date: debt.startingDate,
          totalPrice: debt.totalPrice
        }
      });
      setSummary({
        amount: total,
        stakeholders: data.length
      });
      setExpenses(parser);
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
        <FlatList data={expenses}
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
              type="provider"
              onPress={() => push("DebtorScreen", { expenseId: item.id, name: item.name })}
              name={item.name}
              date={item.date}
              purchases={item.purchases as string}
              sales={item.sales}
              totalPrice={item.totalPrice} />
          } />
      </View>
      {summary && (
        <SummaryDebt
          type="expense"
          amount={summary?.amount}
          stakeholders={summary?.stakeholders}
        />
      )}
    </View>
  );
};

export default ExpenseDebt;