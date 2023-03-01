import { View, TextInput, Text } from "react-native";
import Icon from "../../components/common/Icon";
import Close from "react-native-vector-icons/AntDesign";

import React from "react";
import customStyles from "../../styles/customStyles";

const { width, textBlack, textLight } = customStyles;

interface Props {
  type: string; // "income" || "expense"
  amount: number;
  stakeholders: number;
}

const SummaryDebt = ({
  type,
  amount,
  stakeholders
}: Props) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#7888A8",
        flexDirection: "column",
        display: "flex",
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>
        Total a {`${type === "income" ? "cobrar" : "pagar"}`}
      </Text>
      <Text style={{ color: "white" }}>
        ${amount?.toLocaleString("es")} de {stakeholders} {`${type === "income" ? "Clientes" : "Provedores"}`}
      </Text>
    </View>
  );
};

export default SummaryDebt;
