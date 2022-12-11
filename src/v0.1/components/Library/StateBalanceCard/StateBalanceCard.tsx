import React from "react";
import { View, Text } from "react-native";
import Down from "react-native-vector-icons/Ionicons";
import Top from "react-native-vector-icons/Ionicons";
import customStyles from "../../../styles/customStyles";
import styles from "./style";

const {
  item,
  itemLight,
  income,
  incomeLight,
  expense,
  expenseLight,
  orange,
  orangeLight,
} = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  state: string;
  value: string;
  left?: number;
  right?: number;
  type: string;
}
// TODO: Refactor this componente
const handleIcon = (type: string) => {
  switch (type) {
    case "ingreso":
      return (
        <View style={styles({ background: incomeLight }).iconStyle}>
          <Top name="ios-arrow-up-sharp" size={35} color={income} />
        </View>
      );

    case "egreso":
      return (
        <View style={styles({ background: expenseLight }).iconStyle}>
          <Down name="ios-arrow-down-sharp" size={35} color={expense} />
        </View>
      );
    case "cobrar":
      return (
        <View style={styles({ background: itemLight }).iconStyle}>
          <Top name="ios-arrow-up-sharp" size={35} color={item} />
        </View>
      );
    case "pagar":
      return (
        <View style={styles({ background: orangeLight }).iconStyle}>
          <Down name="ios-arrow-down-sharp" size={35} color={orange} />
        </View>
      );
  }
};

const StateBalanceCard = ({ state, value, type, left, right }: Props) => {
  return (
    <View style={styles({ left, right }).wrapper}>
      <View style={styles({}).container}>
        {handleIcon(type)}
        <View style={styles({}).subWrapper}>
          <Text style={styles({}).textLabel}>{state}</Text>
        </View>
        <Text style={styles({}).textValue}>{value}</Text>
      </View>
    </View>
  );
};

export default StateBalanceCard;
