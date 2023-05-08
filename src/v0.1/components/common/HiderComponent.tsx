import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  size: number;
  color: string;
  value: boolean;
  toggle: () => void;
  style?: object;
}

const HiderComponent = ({ size, color, value, style, toggle }: Props) => {
  return value ? (
    <TouchableOpacity onPress={toggle} style={style}>
      <Icon name="eye-off" size={size} color={color} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={toggle} style={style}>
      <Icon name="eye" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default HiderComponent;
