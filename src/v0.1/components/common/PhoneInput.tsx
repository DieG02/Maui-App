import React from 'react';
import { View, TextInput, Text } from 'react-native';
import customStyles from '../../styles/customStyles';
import PhoneAreaModal from '../../components/common/Modals/PhoneAreaModal';
import { ICountryCode } from '../../types/types';

const { secondaryColorBorder, textBlack, expense, textLight } = customStyles;

interface Props {
  value: string;
  setValue: (value: string) => void;
  name: string;
  placeholder: string;
  marginBottom?: number;
  marginTop?: number;
  countryCode: string;
  setCountryCode: (value: string) => void;
  notRequired?: boolean;
  options: ICountryCode[];
}

const PhoneInput = ({
  value,
  setValue,
  name,
  placeholder,
  marginBottom,
  marginTop,
  countryCode,
  setCountryCode,
  notRequired,
  options,
}: Props) => {
  return (
    <View
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Bold',
          marginBottom: 10,
        }}
      >
        {name} <Text style={{ color: expense }}>{!notRequired && '*'}</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 55,
        }}
      >
        <PhoneAreaModal selectedOption={countryCode} setSelectedOption={setCountryCode} options={options} />
        <View
          style={{
            borderRadius: 12,
            borderColor: secondaryColorBorder,
            borderWidth: 1,
            flex: 1,
            maxWidth: 225,
          }}
        >
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={textLight}
            keyboardType='phone-pad'
            style={{
              paddingHorizontal: 20,
              color: textBlack,
              fontSize: 15,
              fontFamily: 'Gilroy-Medium',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneInput;
