import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";

const { secondaryColor } = globalStyles;

interface Props {
  onPress?: () => void;
  title: string;
  icon: React.ReactNode;
  arrow?: React.ReactNode;
}

function OptionCard({ title, icon, arrow, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
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
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {arrow}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: secondaryColor,
    fontFamily: "Gilroy-Bold",
  },
});

export default OptionCard;
