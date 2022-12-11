import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import Spacer from "../../../v0.1/components/common/Spacer";
import { useQuery } from "react-query";
import { getWeeklyTransactions } from "../../../v0.1/services/transactions";
import TransactionsDropdown from "../../../v0.1/components/common/TransactionsDropdown";
import { useFocusEffect } from "@react-navigation/native";

const TabWeek = () => {
  const { data, refetch: getTransaction } = useQuery(
    "weeklyTransactions",
    getWeeklyTransactions
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
export default TabWeek;
