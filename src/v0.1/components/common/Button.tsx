import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

type props = React.FC<Props & React.ComponentProps<typeof TouchableOpacity>>;
interface Props {
  text: string;
  container: React.CSSProperties;
  disabled?: boolean;
  color?: string;
}

const Button: props = ({ color, style, container, text, disabled, ...otherProps }) => {
  const styles = StyleSheet.create({
    root: {
      borderRadius: 30,
      height: 50,
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
    <View style={container}>
    <TouchableOpacity
      style={[styles.root, style]}
      disabled={disabled}
      {...otherProps}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    </View>
  );
};

export default Button;
