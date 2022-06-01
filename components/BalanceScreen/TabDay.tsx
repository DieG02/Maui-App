import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Title from "../common/Title";
import Spacer from "../common/Spacer";
import { balance } from "../../helpers/seed";
import TransactionModal from "../common/TransactionsModal";
import { useQuery } from "react-query";
import { lastTransactions } from "../../services/transactions";

const { width } = Dimensions.get("window");

const TabDay = () => {
  const { data, refetch: getTransaction } = useQuery(
    "transactions",
    lastTransactions
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
        <Title title="Hoy" />
        <Spacer height={20} />
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 30,
          }}
        >
          {data?.data.map((item: ITransaction) => (
            <TransactionModal data={item} key={item.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default TabDay;
