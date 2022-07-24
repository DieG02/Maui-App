import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TransactionModal from "../common/TransactionsModal";
import { useQuery } from "react-query";
import { getTransactions } from "../../services/transactions";
import { Text } from "react-native-paper";

const TransactionsContainer = () => {
  const { data, refetch: getTransaction } = useQuery("transactions", () =>
    getTransactions({ take: 10 })
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
          {data?.length !== 0 ? (
            data?.map((item) => <TransactionModal data={item} key={item.id} />)
          ) : (
            <View
              style={{
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#A5A5A5",
                  fontFamily: "Gilroy-SemiBold",
                }}
              >
                No tenes transacciones registradas
              </Text>
            </View>
          )}
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
