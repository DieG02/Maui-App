import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import customStyles from '../../../styles/customStyles';

const { mainColor, textBlack, textLight, secondaryColorBorder, expense } = customStyles;

interface Props {
  value: string;
  name?: string;
  placeholder?: string;
  marginBottom?: number;
  marginTop?: number;
  onPress?: () => void;
  onPressClose?: () => void;
  required?: boolean;
}

const SelectionModal = ({
  name,
  value,
  placeholder,
  marginBottom,
  marginTop,
  onPress,
  onPressClose,
  required,
}: Props) => {
  return (
    <View style={{ marginBottom: marginBottom, marginTop: marginTop }}>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Bold',
          marginBottom: 10,
        }}
      >
        {name} {required && <Text style={{ color: expense }}>*</Text>}
      </Text>
      {value !== '' && value?.length !== 0 ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 55,
            borderRadius: 12,
            borderColor: secondaryColorBorder,
            borderWidth: 1,
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              marginLeft: 20,
              color: textBlack,
              fontFamily: 'Gilroy-Bold',
            }}
          >
            {value}
          </Text>
          <TouchableOpacity
            onPress={onPressClose}
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AntDesign name='close' size={22} style={{ marginRight: 20 }} color={mainColor} />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 55,
            borderRadius: 12,
            borderColor: secondaryColorBorder,
            borderWidth: 1,
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              marginHorizontal: 20,
              color: textLight,
              fontSize: 16,
              fontFamily: 'Gilroy-Medium',
            }}
          >
            {placeholder}
          </Text>
          <Entypo name='chevron-down' size={25} style={{ marginRight: 20 }} color={mainColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectionModal;
