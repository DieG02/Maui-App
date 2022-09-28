import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Down from "react-native-vector-icons/AntDesign";
import Close from "react-native-vector-icons/Entypo";
import globalStyles from "../../../styles/globalStyles";

const { mainColor, textBlack, textLight, secondaryColorBorder, expense } =
  globalStyles;

interface Props {
  value: string;
  name?: string;
  setValue: (value: string) => void;
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
          fontFamily: "Gilroy-Bold",
          marginBottom: 10,
        }}
      >
        {name} {required && <Text style={{ color: expense }}>*</Text>}
      </Text>
      {value !== "" && value?.length !== 0 ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 55,
            borderRadius: 12,
            borderColor: secondaryColorBorder,
            borderWidth: 1,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: 20,
              color: textBlack,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {value}
          </Text>
          <TouchableOpacity
            onPress={onPressClose}
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Down
              name="close"
              size={25}
              style={{ marginRight: 20 }}
              color={mainColor}
            />
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
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginHorizontal: 20,
              color: textLight,
            }}
          >
            {placeholder}
          </Text>
          <Close
            name="chevron-down"
            size={25}
            style={{ marginRight: 20 }}
            color={mainColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectionModal;
