import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";
import HiderComponent from "./HiderComponent";
import useToogle from "../../hooks/useToogle";

const { textBlack, expense, secondaryColorBorder } = customStyles;

interface Props {
  value: string;
  name?: string;
  setValue: (value: string) => void;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad"
    | "number-pad";

  marginBottom?: number;
  marginTop?: number;
  children?: React.ReactNode;
  required?: boolean;
  secureTextEntry?: boolean;
  isHide?: boolean;
}

const SecureInput = ({
  name,
  value,
  setValue,
  placeholder,
  keyboardType,
  secureTextEntry,
  marginBottom,
  marginTop,
  required,
}: Props) => {
  const { value: isToogle, toogle } = useToogle();

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          borderRadius: 12,
          borderColor: secondaryColorBorder,
          borderWidth: 1,
          height: 55,
        }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#ACACAC"
          keyboardType={keyboardType}
          secureTextEntry={!isToogle ? secureTextEntry : !secureTextEntry}
          style={{
            paddingHorizontal: 20,
            color: textBlack,
            width: "80%",
          }}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={toogle}
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 1,
            borderLeftColor: secondaryColorBorder,
          }}
        >
          <HiderComponent size={20} color={textBlack} value={isToogle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecureInput;
