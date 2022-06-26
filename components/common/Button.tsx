import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  text: string;
  style?: object;
  disabled?: boolean;
}

const Button = ({ style, text, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, style]}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Button;
