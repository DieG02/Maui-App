import { View, Text, Dimensions } from "react-native";
import React from "react";

const { height } = Dimensions.get("window");

interface Props {
  color?: string;
  title: string;
  percentage?: number;
}

const EmptyState = ({ color, title, percentage }: Props) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color || "white",
        height: height - height * (percentage || 0.3),
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: "#A5A5A5",
          fontFamily: "Gilroy-SemiBold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default EmptyState;
