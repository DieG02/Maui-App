import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";

import SummaryDebt from "../../components/common/SummaryDebt";
import DebtContactCard from "../../components/common/DebtContactCard";
import customStyles from "../../styles/customStyles";
import { getAllIncome } from "../../services/debts";

const { background } = customStyles;
interface Props {
  navigation: any
}

const IncomeDebt = () => {
    const navigation = useNavigation();
    const [income, setIncomes] = useState<IDebtContact[]>([]);
    const [summary, setSummary] = useState<any>({
      amount: null,
      stakeholders: null,
    });

    const {
      data,
      isLoading
    } = useQuery("clients", getAllIncome, {
      onSuccess(data: IncomeDebt[]) {
        let total = 0;
        const parser = data.map((debt: IncomeDebt): IDebtContact => {
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

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: background,
        }}
      >
        <ScrollView
          style={{
            marginTop: 20,
            backgroundColor: background,
          }}
        >
          {/* Acá deberia hacer el llamado al back para renderear la data de all Income */}
          {income.map((debt: any, i: number) => (
            <DebtContactCard data={debt} type="client" onPress={() => navigation.navigate("DebtorScreen")} key={i}/>
          ))}
        </ScrollView>
        <SummaryDebt type="income" amount={summary.amount} stakeholders={summary.stakeholders} />
      </View>
    );
};

export default IncomeDebt;
