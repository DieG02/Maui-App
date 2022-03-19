import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Title({ title, children }) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    // color: "#1A1A1A",
    color: "#60708F",
    fontFamily: "Gilroy-Bold",
  },
});

export default Title;
