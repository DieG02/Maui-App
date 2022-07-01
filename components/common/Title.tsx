import { View, Text, StyleSheet } from "react-native";
import React from "react";
// import globalStyles from "../../styles/globalStyles";

// const { secondaryColor } = globalStyles;

interface Props {
  title: string;
  children?: React.ReactNode;
}

const Title = ({ title, children }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  text: {
    fontSize: 18,
    // color: secondaryColor,
    color: "#7888a8",
    fontFamily: "Gilroy-SemiBold",
  },
});

export default Title;
