import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type props = React.FC<Props & React.ComponentProps<typeof TouchableOpacity>>;
interface Props {
  text: string;
  disabled?: boolean;
  color?: string;
}

const Button: props = ({ color, style, text, disabled, ...otherProps }) => {
  const styles = StyleSheet.create({
    root: {
      borderRadius: 30,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: color ? color : "white",
      fontSize: 18,
      fontFamily: "Gilroy-SemiBold",
    },
  });
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

export default Button;
