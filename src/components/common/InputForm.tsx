import React from "react";
import { TextInput, Text, View } from "react-native";
import { separator, round } from "../../utils/math";
import globalStyles from "../../styles/globalStyles";

interface Props {
  bottom?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  name: string;
  marginBottom?: number;
  marginTop?: number;
  autoFocus?: boolean;
  onSubmit?: () => void;
  required?: boolean;
}

const { textBlack, expense } = globalStyles;

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
          borderColor: "#EAEAEA",
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
          value={value}
          onChangeText={(text) => {
            const [integer, decimal] = text.split(",");
            const formated =
              separator(integer) + (decimal !== undefined ? "," + decimal : "");
            if (formated.length <= 20) setValue(formated);
          }}
          onBlur={() => setValue(round(value))}
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
