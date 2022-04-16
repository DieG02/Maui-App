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
          {balance.map((i) => (
            <TransactionModal
              key={i.id}
              name={i.name}
              price={i.price}
              type={i.type}
              state={i.state}
              color={i.color}
              icon={i.icon}
            />
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
