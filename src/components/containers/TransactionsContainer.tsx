import React from "react";
import { StyleSheet, View } from "react-native";
import EmptyState from "../common/EmptyState";
import TransactionCard from "../common/TransactionCard/TransactionCard";

interface Props {
  data: any;
}

const TransactionsContainer = ({ data }: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          {data?.length !== 0 ? (
            data?.map((item: any) => (
              <TransactionCard data={item} key={item.id} />
            ))
          ) : (
            <EmptyState
              title=" No tenes transacciones registradas"
              percentage={0.7}
            />
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
