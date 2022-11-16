import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../../../styles/globalStyles";

const { textBlack } = globalStyles;

interface Props {
  label: string;
  value: string | number;
}

const RowTransaction = ({ label, value }: Props) => {
  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: textBlack,
            fontFamily: "Gilroy-Regular",
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: textBlack,
            fontFamily: "Gilroy-Regular",
          }}
        >
          {value}
        </Text>
      </View>
      <View
        style={{
          height: 1.5,
          backgroundColor: "#D9D9D9",
        }}
      />
    </View>
  );
};

export default RowTransaction;
