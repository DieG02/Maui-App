import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

interface Props {
  children?: React.ReactNode;
  bottom?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  focus?: boolean;
  style?: object;
  textStyle?: object;
  horizontal?: number;
}

const InputForm = ({
  children,
  bottom,
  keyboardType,
  placeholder,
  value,
  setValue,
  focus,
  style,
  textStyle,
  horizontal,
}: Props) => {
  const styles = StyleSheet.create({
    root: {
      marginBottom: bottom,
      marginTop: 10,
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
    },
    text: {
      width: "85%",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: horizontal || 20,
    },
  });

  return (
    <View style={[styles.root, style]}>
      <View style={styles.container}>
        {children}
        {focus ? (
          <TextInput
            style={[styles.text, textStyle]}
            autoFocus={focus}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor="white"
            keyboardType={keyboardType}
          />
        ) : (
          <TextInput
            style={[styles.text, textStyle]}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
        )}
      </View>
    </View>
  );
};

export default InputForm;
