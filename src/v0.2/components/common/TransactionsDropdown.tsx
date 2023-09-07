import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TransactionCard from "../../../v0.1/components/common/TransactionCard/TransactionCard";
import Title from "../../../v0.1/components/common/Title";
import Spacer from "../../../v0.1/components/common/Spacer";
import customStyles from "../../../v0.1/styles/customStyles";
import { getPeriodTransactionsResponseDto } from "../../../v0.1/services/transactions";

const { secondaryColor } = customStyles;

interface Props {
  item: getPeriodTransactionsResponseDto[0];
}

const TransactionsDropdown = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const valueTotal = item.items.reduce((acc, curr) => {
    if (curr?.category.name === "Venta") {
      return acc + curr.value;
    } else {
      return acc - curr.value;
    }
  }, 0);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{
          height: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          //   backgroundColor: "#fafafa",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Title title={item.date === "today" ? "Hoy" : item.date} />
        <Text
          style={{
            fontSize: 17,
            color: secondaryColor,
            fontFamily: "Gilroy-Bold",
            marginHorizontal: 30,
          }}
        >
          {valueTotal > 0 ? `$${valueTotal}` : `-$${Math.abs(valueTotal)}`}
        </Text>
      </TouchableOpacity>
      {isOpen ? (
        <View
          style={{
            marginHorizontal: 30,
          }}
        >
          {item.items.map((data) => (
            <TransactionCard data={data} key={data.id} />
          ))}
        </View>
      ) : (
        <Spacer height={10} />
      )}
    </View>
  );
};

export default TransactionsDropdown;
