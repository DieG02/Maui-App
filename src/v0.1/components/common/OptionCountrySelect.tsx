import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SvgXml } from 'react-native-svg';

interface Props {
  name: string;
  flag: string;
  prefix: string;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
}

const OptionCountrySelect = ({ name, flag, prefix, backgroundColor, textColor, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        height: 55,
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 5,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection:'row',
          flexWrap:'nowrap',
          justifyContent:'flex-start',
          alignItems:'center',
        }}>
        <SvgXml xml={flag} width='30px' height='30px' style={{marginLeft:20}}/>
        <View
          style={{
            display:'flex',
            flexDirection:'column',
          }}>
          <Text
            style={{
              color: textColor,
              paddingLeft:20,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: textColor,
              paddingLeft:20,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {prefix}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OptionCountrySelect;
