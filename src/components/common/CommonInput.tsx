import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../styles/globalStyles";
import Down from "react-native-vector-icons/Entypo";

const { secondaryColor, mainColor } = globalStyles;

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
  touchable?: boolean;
  onPress?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
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
  autoCapitalize,
  multiline,
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
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {value !== "" && value?.length !== 0 ? (
            <Text
              style={{
                marginLeft: 20,
                color: "#383838",
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
          <Down
            name="chevron-down"
            size={25}
            style={{ marginRight: 20 }}
            color={mainColor}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            height: multiline ? "auto" : 55,
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
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
          />
        </View>
      )}
    </View>
  );
};

export default CommonInput;
