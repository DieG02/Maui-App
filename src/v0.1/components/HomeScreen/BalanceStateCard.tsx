import React from "react";
import { View, Dimensions, Text } from "react-native";
import Down from "react-native-vector-icons/Ionicons";
import Top from "react-native-vector-icons/Ionicons";
import customStyles from "../../styles/customStyles";

const {
  textBlack,
  item,
  itemLight,
  income,
  incomeLight,
  expense,
  expenseLight,
  orange,
  orangeLight,
} = customStyles;

const { width } = Dimensions.get("window");

interface Props {
  state: string;
  value: string;
  left?: number;
  right?: number;
  type: string;
}

const handleIcon = (type: string) => {
  switch (type) {
    case "ingreso":
      return (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: incomeLight,
          }}
        >
          <Top name="ios-arrow-up-sharp" size={35} color={income} />
        </View>
      );

    case "egreso":
      return (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: expenseLight,
          }}
        >
          <Down name="ios-arrow-down-sharp" size={35} color={expense} />
        </View>
      );
    case "cobrar":
      return (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: itemLight,
          }}
        >
          <Top name="ios-arrow-up-sharp" size={35} color={item} />
        </View>
      );
    case "pagar":
      return (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: orangeLight,
          }}
        >
          <Down name="ios-arrow-down-sharp" size={35} color={orange} />
        </View>
      );
  }
};

const BalanceStateCard = ({ state, value, type, left, right }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "#f3f6f8",
        width: (width - 120) / 2,
        borderRadius: 10,
        marginLeft: left,
        marginRight: right,
      }}
    >
      <View
        style={[
          {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginVertical: 10,
            marginHorizontal: 20,
          },
        ]}
      >
        <View
          style={{
            marginVertical: 4,
          }}
        >
          {handleIcon(type)}
        </View>
        <View
          style={{
            marginVertical: 5,
            height: 45,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: textBlack,
              fontSize: 18,
              fontFamily: "Gilroy-Regular",
            }}
          >
            {state}
          </Text>
        </View>
        <Text
          style={{
            color: textBlack,
            fontSize: 20,
            marginBottom: 6,
            fontFamily: "Gilroy-SemiBold",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default BalanceStateCard;
