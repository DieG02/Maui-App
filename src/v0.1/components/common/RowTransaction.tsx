import { View, Text } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';

const { textBlack, babyBlue } = customStyles;

interface Props {
  label: string;
  value: string | number;
}

const RowTransaction = ({ label, value }: Props) => {
  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: textBlack,
            fontFamily: 'Gilroy-Medium',
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: textBlack,
            fontFamily: 'Gilroy-SemiBold',
            maxWidth: '50%',
          }}
          numberOfLines={1}
        >
          {value as string}
        </Text>
      </View>
      <View
        style={{
          height: 1.5,
          backgroundColor: babyBlue,
        }}
      />
    </View>
  );
};

export default RowTransaction;
