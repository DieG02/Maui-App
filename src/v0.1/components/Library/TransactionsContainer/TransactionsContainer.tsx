import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import EmptyState from "../../common/EmptyState";
import styles from "./style";
import TransactionCard from "../TransactionCard";

// TODO: Refactor this interface to use the correct types
interface Props {
  data: any;
  navigation: NavigationProp<any, any>;
}

// TODO: Refactor this component to make it more efficient
const TransactionsContainer = ({ data, navigation }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {data?.length !== 0 ? (
          data?.map((item: any) => (
            <TransactionCard
              data={item}
              key={item.id}
              onPress={() => navigation.navigate("TransactionDetail", { item })}
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
  );
};

export default TransactionsContainer;
