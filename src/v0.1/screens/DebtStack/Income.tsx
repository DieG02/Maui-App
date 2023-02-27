import { useState } from "react";
import { View } from "react-native";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import SummaryDebt from "../../components/common/SummaryDebt";
import DebtContactCard from "../../components/common/DebtContactCard";
import customStyles from "../../styles/customStyles";
import { getAllIncomeDebts } from "../../services/debts";
import ScrollRefreshContainer from "../../components/containers/ScrollRefreshContainer";

const { background } = customStyles;

const IncomeDebt = () => {
  const { navigate } = useNavigation<any>();
  const [income, setIncomes] = useState<IDebtContact[]>([]);
  const [summary, setSummary] = useState<any>({
    amount: null,
    stakeholders: null,
  });

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

  return (
    <View style={{
      flex: 1,
      backgroundColor: background,
    }}>
      <ScrollRefreshContainer refetch={refetch}
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        {income.map((debt: any) => (
          <DebtContactCard
            data={debt}
            type="client"
            onPress={() => navigate("DebtorScreen")}
            key={debt.id}
          />
        ))}
      </ScrollRefreshContainer>
      <SummaryDebt
        type="income"
        amount={summary.amount?.toLocaleString("es")}
        stakeholders={summary.stakeholders}
      />
    </View>
  );
};

export default IncomeDebt;