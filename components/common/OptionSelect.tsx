import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  name: string;
  backgroundColor: string;
  textColor: string;
  onPress: (value: any) => void;
}

const OptionSelect = ({ name, backgroundColor, textColor, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        height: 55,
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          marginLeft: 20,
          color: textColor,
          fontFamily: "Gilroy-Bold",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default OptionSelect;
