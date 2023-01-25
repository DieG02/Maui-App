import { View, TextInput } from "react-native";
import Close from "react-native-vector-icons/AntDesign";

import React from "react";
import customStyles from "../../../styles/customStyles";
import ButtonIcon from "../ButtonIcon";
import styles from "./style";

const { textLight, iconColor } = customStyles;

interface Props {
  onChangeText: (text: string) => void;
  text: string;
  placeholder: string;
  onPress: () => void;
  onBlur?: () => void;
}

const SearchBar = ({
  onChangeText,
  text,
  placeholder,
  onPress,
  onBlur,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        autoFocus={true}
        placeholder={placeholder}
        onBlur={onBlur}
        placeholderTextColor={textLight}
        autoCapitalize="none"
        style={{
          fontSize: 18,
        }}
      />
      <ButtonIcon onPress={onPress}>
        <Close name="close" size={30} color={iconColor} />
      </ButtonIcon>
    </View>
  );
};

export default SearchBar;
