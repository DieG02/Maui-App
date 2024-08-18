import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';

const { mainColor, white, textBlack } = customStyles;

const Toggle = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Bold',
          marginBottom: 10,
        }}
      >
        Cuenta por Default
      </Text>
      <TouchableOpacity
        style={{
          position: 'relative',
          backgroundColor: mainColor,
          borderRadius: 50,
          width: 45,
          borderWidth: 0,
          display: 'flex',
          paddingHorizontal: 2,
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 25,
        }}
      >
        <View
          style={{
            borderRadius: 50,
            width: 20,
            height: 20,
            backgroundColor: white,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

export default Toggle;
