import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { Children } from "react";
import globalStyles from "../../styles/globalStyles";

const { secondaryColor } = globalStyles;

interface Props {
  value: any;
  name: string;
  setValue: (value: any) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  marginBottom?: number;
  marginTop?: number;
  children?: React.ReactNode;
  touchable?: boolean;
  onPress?: () => void;
}

const CommonInput = ({
  name,
  value,
  setValue,
  placeholder,
  keyboardType,
  marginBottom,
  marginTop,
  touchable,
  onPress,
}: Props) => {
  return (
    <View style={{ marginBottom: marginBottom, marginTop: marginTop }}>
      <Text
        style={{
          fontSize: 18,
          color: secondaryColor,
          fontFamily: "Gilroy-Bold",
          marginBottom: 10,
        }}
      >
        {name}
      </Text>
      {touchable ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 55,
            borderRadius: 12,
            borderColor: "#EAEAEA",
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          {value !== "" && value?.length !== 0 ? (
            <Text
              style={{
                marginHorizontal: 20,
                color: "#ACACAC",
                fontFamily: "Gilroy-Bold",
              }}
            >
              {value}
            </Text>
          ) : (
            <Text
              style={{
                marginHorizontal: 20,
                color: "#ACACAC",
              }}
            >
              {placeholder}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View
          style={{
            height: 55,
            borderRadius: 12,
            borderColor: "#EAEAEA",
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor="#ACACAC"
            keyboardType={keyboardType}
            style={{
              marginHorizontal: 20,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default CommonInput;
