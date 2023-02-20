import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { separator, round } from "../../utils/math";
import customStyles from "../../styles/customStyles";

interface Props {
  bottom?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
  name: string;
  marginBottom?: number;
  marginTop?: number;
  autoFocus?: boolean;
  onSubmit?: () => void;
  required?: boolean;
}

const { textBlack, expense, secondaryColorBorder } = customStyles;

const InputForm = ({
  keyboardType,
  placeholder,
  value,
  setValue,
  name,
  marginBottom,
  marginTop,
  autoFocus,
  onSubmit,
  required,
}: Props) => {

  const [formattedValue, setFormattedValue] = useState("");

  function onChangeText(text: string) {
    if(!text) return setFormattedValue("");
    if(text.slice(-1) === ",") return setFormattedValue(text);
    const [integer, decimal = ""] = text.split(",");

    const parsedInt = parseInt(integer.replace(/\./g, ''));
    const parsedFloat = decimal ? decimal.slice(0, 2) : "";
    const value = Number(`${parsedInt}.${parsedFloat}`);
    
    setValue(value);
    setFormattedValue(parsedInt.toLocaleString("ES") + (parsedFloat ? "," + parsedFloat : ""));
  }

  return (
    <View style={{ marginBottom, marginTop }}>
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
          height: 55,
          borderRadius: 12,
          borderColor: secondaryColorBorder,
          borderWidth: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: textBlack,
            fontFamily: "Gilroy-Medium",
            marginLeft: 20,
          }}
        >
          $
        </Text>
        <TextInput
          style={{
            height: 60,
            width: "100%",
            fontSize: 20,
            color: textBlack,
            fontFamily: "Gilroy-Medium",
          }}
          value={formattedValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={20}
          autoFocus={autoFocus}
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
};

export default InputForm;
