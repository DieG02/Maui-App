import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";
import Down from "react-native-vector-icons/Entypo";
import { SvgXml } from 'react-native-svg';
import { countries } from "../../helpers/countries";

const { mainColor, textBlack, expense, secondaryColorBorder } = customStyles;

interface Props {
  value: string;
  setValue: (value: string) => void;
  marginBottom?: number;
  marginTop?: number;
  touchable?: boolean;
  onPress?: () => void;
}

const PrefixInput = ({
  value,
  marginBottom,
  marginTop,
  onPress,
}: Props) => {

  const flag = countries.find((item:any)=>item.id===value);

  return (
    <View style={{ marginBottom: marginBottom, marginTop: marginTop, marginHorizontal: 2 }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 55,
            borderRadius: 12,
            borderColor: secondaryColorBorder,
            borderWidth: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SvgXml xml={flag?flag.flag:null} width='20px' height='20px' style={{marginRight: 5}}/>
          <Text
            style={{
              color: textBlack,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {flag?.prefix}
          </Text>
          <Down
            name="chevron-down"
            size={25}
            color={mainColor}
          />
        </TouchableOpacity>
    </View>
  );
};

export default PrefixInput;