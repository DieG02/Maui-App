import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import EmptyState from "../common/EmptyState";
import TransactionCard from "../common/TransactionCard/TransactionCard";

interface Props {
  data: any;
  navigation: NavigationProp<any, any>;
}

const TransactionsContainer = ({ data, navigation }: Props) => {
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
              <TransactionCard
                data={item}
                key={item.id}
                onPress={() =>
                  navigation.navigate("TransactionDetail", { item })
                }
              />
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
