import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Title from "../common/Title";
import Spacer from "../common/Spacer";
import { balance } from "../../helpers/seed";
import TransactionModal from "../common/TransactionsModal";

const { width } = Dimensions.get("window");

const TabYear = () => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginVertical: 20, backgroundColor: "white" }}>
        <Title title="2022" />
        <Spacer height={20} />
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 30,
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
    </ScrollView>
  );
};
export default TabYear;
