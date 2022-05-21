import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
  children: JSX.Element;
  style?: any;
}

const Icon = ({ onPress, children, style }: Props) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={[styles.icons, style]}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  icons: {
    width: 50,
    height: 50,
    borderColor: "#F0F1F5",

    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});

export default Icon;
