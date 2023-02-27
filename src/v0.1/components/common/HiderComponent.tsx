import React from "react";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  size: number;
  color: string;
  value: boolean;
}
const HiderComponent = ({ size, color, value }: Props) => {
  return value ? (
    <Icon name="eye-off" size={size} color={color} />
  ) : (
    <Icon name="eye" size={size} color={color} />
  );
};

export default HiderComponent;
