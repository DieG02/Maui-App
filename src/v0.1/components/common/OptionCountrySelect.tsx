import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import customStyles from '../../styles/customStyles';

interface Props {
  name: string;
  flag: string;
  prefix?: string;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
  withPrefix?: boolean;
  galleryMode?: boolean;
  borderWith?: number;
}
const { secondaryColorBorder } = customStyles;

const OptionCountrySelect = ({
  name,
  flag,
  prefix,
  backgroundColor,
  textColor,
  onPress,
  withPrefix = true,
  galleryMode = false,
  borderWith = 0,
}: Props) => {
  return galleryMode ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        height: 100,
        width: '30%',
        borderRadius: 12,
        borderWidth: borderWith,
        borderColor: secondaryColorBorder,
        margin: 5,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CountryFlag isoCode={flag} size={18} />
        <Text
          style={{
            color: textColor,
            fontFamily: 'Gilroy-Bold',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          {name}
        </Text>
        {withPrefix && <Text style={{ color: textColor, fontFamily: 'Gilroy-Bold' }}>{prefix}</Text>}
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        height: 55,
        borderRadius: 12,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <CountryFlag isoCode={flag} size={18} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              color: textColor,
              paddingLeft: 20,
              fontFamily: 'Gilroy-Bold',
            }}
          >
            {name}
          </Text>
          {withPrefix && <Text style={{ color: textColor, paddingLeft: 20, fontFamily: 'Gilroy-Bold' }}>{prefix}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OptionCountrySelect;
