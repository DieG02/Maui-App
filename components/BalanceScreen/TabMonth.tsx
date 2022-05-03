import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Title from "../common/Title";
import Spacer from "../common/Spacer";
import { balance } from "../../helpers/seed";
import TransactionModal from "../common/TransactionsModal";

const { width } = Dimensions.get("window");

const TabMonth = () => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginVertical: 20, backgroundColor: "white" }}>
        <Title title="Mayo" />
        <Spacer height={20} />
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 30,
          }}
        >
          {balance.map((item) => (
            <TransactionModal key={item.id} data={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default TabMonth;
