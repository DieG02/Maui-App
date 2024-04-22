import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  size: number;
  color: string;
  value: boolean;
  toggle: () => void;
  style?: StyleProp<ViewStyle>;
}

const HiderComponent = ({ size, color, value, toggle }: Props) => {
  return value ? (
    <TouchableOpacity
      onPress={toggle}
      style={{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Icon name='eye-off' size={size} color={color} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={toggle}
      style={{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Icon name='eye' size={size} color={color} />
    </TouchableOpacity>
  );
};

export default HiderComponent;
