import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../styles/globalStyles";

const { secondaryColor } = globalStyles;

interface Props {
  name: string;
  setDate: (date: string) => void;
  date: string;
  onPress: () => void;
}

const InputDate = ({ name, setDate, date, onPress }: Props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: secondaryColor,
          fontFamily: "Gilroy-Bold",
          marginBottom: 10,
        }}
      >
        {name}
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "#33E69B",
            paddingHorizontal: 30,
            marginRight: 10,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 16, color: "white", fontFamily: "Gilroy-Bold" }}
          >
            {date}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#33E69B",
            paddingHorizontal: 30,
            marginRight: 10,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 16, color: "white", fontFamily: "Gilroy-Bold" }}
          >
            Ayer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputDate;
