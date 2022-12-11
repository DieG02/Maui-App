import React from "react";
import { View, Text, StyleSheet } from "react-native";
import customStyles from "../../styles/customStyles";

const { textBlack, background } = customStyles;

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
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    backgroundColor: background,
  },
  text: {
    fontSize: 18,
    color: textBlack,
    fontFamily: "Gilroy-SemiBold",
  },
});

export default Title;
