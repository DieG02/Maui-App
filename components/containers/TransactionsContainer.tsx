import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TransactionModal from "../common/TransactionsModal";
// import { balance } from "../../helpers/seed";
import { useQuery } from "react-query";
import { lastTransactions } from "../../services/transactions";

const TransactionsContainer = () => {
  const { data, refetch: getTransaction } = useQuery(
    "transactions",
    lastTransactions
  );

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          {data?.data.map((item: ITransaction) => (
            <TransactionModal data={item} key={item.id} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: "white" },
  container: {
    marginHorizontal: 30,
  },
});
export default TransactionsContainer;
