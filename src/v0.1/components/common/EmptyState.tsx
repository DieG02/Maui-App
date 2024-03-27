import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';

const { height, textLight, background } = customStyles;

interface Props {
  color?: string;
  title: string;
  percentage?: number;
  style?: StyleProp<ViewStyle>;
}

const EmptyState = ({ color, title, percentage, style }: Props) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color || background,
          height: height - height * (percentage || 0.3),
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 18,
          color: textLight,
          fontFamily: 'Gilroy-SemiBold',
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default EmptyState;
