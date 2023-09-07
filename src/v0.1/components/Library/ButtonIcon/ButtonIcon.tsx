import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";

interface Props {
  onPress?: () => void;
  children: JSX.Element;
  align?: "left" | "right";
}

const ButtonIcon = ({ onPress, children, align }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles(align).wrapper}>{children}</View>
    </TouchableOpacity>
  );
};

export default ButtonIcon;
