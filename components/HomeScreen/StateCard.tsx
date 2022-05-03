import React, { ReactNode } from "react";
import { View, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");
const ancho = (width - 120) / 2;

interface Props {
  color: string;
  state: string;
  value: string;
  icon: ReactNode;
  left?: number;
  right?: number;
}

const StateCard = ({ color, state, value, icon, left, right }: Props) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 180,
        width: ancho,
        borderRadius: 25,
        // elevation: 0.2,
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
            width: 60,
            height: 60,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            color: "#60708F",
            fontSize: 18,
            marginVertical: 8,
            fontFamily: "Gilroy-Regular",
          }}
        >
          {state}
        </Text>
        <Text
          style={{
            color: "#60708F",
            fontSize: 20,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default StateCard;
