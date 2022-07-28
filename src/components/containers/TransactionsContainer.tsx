import React from "react";
import { StyleSheet, View } from "react-native";
import TransactionModal from "../common/TransactionsModal";
import { Text } from "react-native-paper";

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
              <TransactionModal data={item} key={item.id} />
            ))
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
