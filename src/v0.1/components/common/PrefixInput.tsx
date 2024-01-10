import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import Icon from 'react-native-vector-icons/Entypo';
import CountryFlag from 'react-native-country-flag';

const { mainColor, textBlack, secondaryColorBorder, width } = customStyles;

interface Props {
  value: any;
  marginBottom?: number;
  marginTop?: number;
  onPress?: () => void;
}

const PrefixInput = ({ value, marginBottom, marginTop, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
        width: width / 4,
        borderRadius: 12,
        borderColor: secondaryColorBorder,
        borderWidth: 1,
        paddingHorizontal: 10,
        height: 55,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <CountryFlag isoCode={value.isoCode} size={15} />
      <Text
        style={{
          color: textBlack,
          fontFamily: 'Gilroy-SemiBold',
          paddingHorizontal: 5,
        }}
      >
        {value.countryPrefix}
      </Text>
      <Icon name='chevron-down' size={25} color={mainColor} />
    </TouchableOpacity>
  );
};

export default PrefixInput;
