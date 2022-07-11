import React, { ReactNode } from "react";
import { View, Dimensions, Text } from "react-native";

import globalStyles from "../../styles/globalStyles";

const { secondaryColor } = globalStyles;

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
        width: ancho,
        borderRadius: 25,
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
          }}
        >
          {icon}
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
              color: secondaryColor,
              fontSize: 18,
              fontFamily: "Gilroy-Regular",
            }}
          >
            {state}
          </Text>
        </View>
        <Text
          style={{
            color: secondaryColor,
            fontSize: 20,
            marginBottom: 5,
            fontFamily: "Gilroy-SemiBold",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default StateCard;
