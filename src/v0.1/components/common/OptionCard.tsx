import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import customStyles from "../../styles/customStyles";

interface Props {
  onPress?: () => void;
  title: string;
  icon: React.ReactNode;
  arrow?: React.ReactNode;
}

const { textBlack, background2 } = customStyles;

const OptionCard = ({ title, icon, arrow, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              backgroundColor: background2,
            }}
          >
            {icon}
          </View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {arrow}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: textBlack,
    fontFamily: "Gilroy-Medium",
  },
});

export default OptionCard;
