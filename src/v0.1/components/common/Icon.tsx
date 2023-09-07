import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  onPress?: () => void;
  children: JSX.Element;
  style?: object;
}
const styles = StyleSheet.create({
  icons: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});

const Icon = ({ onPress, children, style }: Props) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={[styles.icons, style]}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Icon;
