import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../styles/themeStyles";

function OptionCard({ title, icon, arrow, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={theme.row}>
        <View
          style={[
            theme.row,
            {
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              backgroundColor: "#E6EFF8",
              width: 40,
              height: 40,
              marginRight: 20,
              borderRadius: 40,
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
    color: "#131313",
  },
});

export default OptionCard;
