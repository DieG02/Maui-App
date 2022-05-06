import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  color?: string;
  onPress?: () => void;
  active?: boolean;
  children: React.ReactNode;
}

const ButtonIcon = ({ children, onPress, color, active }: Props) => {
  const styles = StyleSheet.create({
    container: {
      height: 55,
      width: 55,
      backgroundColor: color || "#FAFAFA",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <TouchableOpacity
      disabled={active || false}
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.1}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonIcon;
