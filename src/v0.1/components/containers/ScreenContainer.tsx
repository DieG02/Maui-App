import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";

interface Props extends React.ComponentProps<typeof SafeAreaView> {
  children: React.ReactNode;
}

const { background } = customStyles;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: background,
  },
});

const ScreenContainer = ({ children }: Props) => {
  return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
};

export default ScreenContainer;
