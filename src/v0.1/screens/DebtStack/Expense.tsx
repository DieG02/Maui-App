import React, { useState } from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import SummaryDebt from "../../components/common/SummaryDebt";
import { View, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { getAllExpenseDebts } from "../../services/debts";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { useNavigation } from "@react-navigation/native";

const { background } = customStyles;

interface Props {
  navigation: any
}

const ExpenseDebt = () => {
    const navigation = useNavigation<any>();
    const [expenses, setExpenses] = useState<IDebtContact[]>([]);
    const [summary, setSummary] = useState<any>({
      amount: null,
      stakeholders: null,
    });

    const { data } = useQuery("expenseDebts", getAllExpenseDebts, {
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
        <ScrollView style={{ marginTop: 20 }}>
          {expenses.map((debt: any, i: number) => (
            <DebtContactCard 
              data={debt} 
              type="provider" 
              onPress={() => navigation.push("DebtorScreen", { expenseId: debt.id })}
              key={i}
            />
          ))}
        </ScrollView>
        <SummaryDebt 
          type="expense"
          amount={summary.amount?.toLocaleString("es")}
          stakeholders={summary.stakeholders}
        />
      </View>
    );
  };

export default ExpenseDebt;
