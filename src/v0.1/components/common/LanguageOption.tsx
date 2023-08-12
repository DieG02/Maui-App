import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import customStyles from '../../styles/customStyles';

type Props = {
  flag: string;
  label: string;
  onPress: () => void;
};

const LanguageOption = ({ flag, label, onPress }: Props) => {
  const { textBlack } = customStyles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 55,
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 5,
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
          paddingHorizontal: 15,
        }}
      >
        <Image source={flag as ImageSourcePropType} style={{ width: 26, height: 26, marginRight: 20 }} />
        <Text style={{ color: textBlack, fontFamily: 'Gilroy-Bold' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LanguageOption;
