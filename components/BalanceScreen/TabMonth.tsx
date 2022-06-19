import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Title from "../common/Title";
import Spacer from "../common/Spacer";
import { balance } from "../../helpers/seed";
import TransactionModal from "../common/TransactionsModal";
import { useQuery } from "react-query";
import { getMonthlyTransactions } from "../../services/transactions";
import TransactionsDropdown from "../common/TransactionsDropdown";

const { width } = Dimensions.get("window");

const TabMonth = () => {
  const { data, refetch: getTransaction } = useQuery(
    "monthlyTransactions",
    getMonthlyTransactions
  );

  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginVertical: 20, backgroundColor: "white" }}>
        {data?.map((item) => (
          <TransactionsDropdown item={item} key={item.date} />
        ))}
      </View>
      <Spacer height={40} />
    </ScrollView>
  );
};
export default TabMonth;
