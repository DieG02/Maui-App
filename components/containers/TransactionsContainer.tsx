import React from "react";
import { StyleSheet, View } from "react-native";
import TransactionModal from "../common/TransactionsModal";
import { balance } from "../../helpers/seed";

const TransactionsContainer = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          {balance.map((item) => (
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
