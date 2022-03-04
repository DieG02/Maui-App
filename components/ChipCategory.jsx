import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function ChipCategory({
  name,
  onPress,
  textStyle,
  containerStyle,
}) {
  const styles = StyleSheet.create({
    text: {
      marginHorizontal: 20,
      fontSize: 18,
      // color: "#3784F9",
      color: textStyle,
      fontWeight: "500",
    },
    container: {
      // backgroundColor: "#F9F9F9",
      backgroundColor: containerStyle,
      borderRadius: 20,
      justifyContent: "center",
      marginRight: 10,
      height: 40,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}
