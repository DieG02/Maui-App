import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import Spacer from "../common/Spacer";
import { useQuery } from "react-query";
import { getDailyTransactions } from "../../services/transactions";
import TransactionsDropdown from "../common/TransactionsDropdown";
import { useFocusEffect } from "@react-navigation/native";

const TabDay = () => {
  const { data, refetch: getTransaction } = useQuery(
    "daylyTransactions",
    getDailyTransactions
  );

  useFocusEffect(
    useCallback(() => {
      getTransaction();
    }, [])
  );

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
export default TabDay;
