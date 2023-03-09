import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  size: number;
  color: string;
  value: boolean;
  toogle: () => void;
}
const HiderComponent = ({ size, color, value, toogle }: Props) => {
  return value ? (
    <TouchableOpacity onPress={toogle}>
      <Icon name="eye-off" size={size} color={color} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={toogle}>
      <Icon name="eye" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default HiderComponent;
