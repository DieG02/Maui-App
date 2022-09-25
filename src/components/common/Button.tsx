import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type props = React.FC<Props & React.ComponentProps<typeof TouchableOpacity>>;
interface Props {
  text: string;
  disabled?: boolean;
}

const Button: props = ({ style, text, disabled, ...otherProps }) => {
  return (
    <TouchableOpacity
      style={[styles.root, style]}
      disabled={disabled}
      {...otherProps}
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
