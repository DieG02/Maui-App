import { View, StyleSheet } from "react-native";
import React from "react";

interface Props {
  height?: number;
  width?: number;
}

const Spacer = ({ height, width }: Props) => {
  const styles = StyleSheet.create({
    root: {
      height: height || 40,
      width: width,
    },
  });
  return <View style={styles.root} />;
};

export default Spacer;
