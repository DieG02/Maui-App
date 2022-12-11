import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";

interface Props extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
}
const { marginHorizontal } = customStyles;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: marginHorizontal,
  },
});

const ScrollContainer = ({ children }: Props) => {
  return (
    <ScrollView
      style={styles.root}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;
