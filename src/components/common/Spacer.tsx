import { View, StyleSheet } from "react-native";
import React from "react";

interface Props {
  height?: number;
}

const Spacer = ({ height }: Props) => {
  const styles = StyleSheet.create({
    root: {
      height: height || 40,
    },
  });
  return <View style={styles.root} />;
};

export default Spacer;
