import React, { useState } from "react";
import SummaryDebt from "../../components/common/SummaryDebt";
import { View } from "react-native";
import { useQuery } from "react-query";
import { getAllExpenseDebts } from "../../services/debts";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { useNavigation } from "@react-navigation/native";
import ScrollRefreshContainer from "../../components/containers/ScrollRefreshContainer";

const { background } = customStyles;

const ExpenseDebt = () => {
  const { push } = useNavigation<any>();
  const [expenses, setExpenses] = useState<IDebtContact[]>([]);
  const [summary, setSummary] = useState<any>({
    amount: null,
    stakeholders: null,
  });

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <ScrollRefreshContainer refetch={refetch}
        style={{ marginTop: 20 }}>
        {expenses.map((debt: any) => (
          <DebtContactCard
            data={debt}
            type="provider"
            onPress={() => push("DebtorScreen", { expenseId: debt.id })}
            key={debt.id}
          />
        ))}
      </ScrollRefreshContainer>
      <SummaryDebt
        type="expense"
        amount={summary.amount?.toLocaleString("es")}
        stakeholders={summary.stakeholders}
      />
    </View>
  );
};

export default ExpenseDebt;