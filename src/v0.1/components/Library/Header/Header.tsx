import { View, Text } from "react-native";
import React from "react";
import customStyles from "../../../styles/customStyles";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Search from "react-native-vector-icons/Feather";
import styles from "./style";

const { iconColor } = customStyles;

interface SimpleProps {
  label: string;
  onPressSearch?: () => void;
  withSearch?: boolean;
}

const Header = ({ label, withSearch, onPressSearch }: SimpleProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{label}</Text>
      {withSearch && (
        <ButtonIcon onPress={onPressSearch}>
          <Search name="search" size={30} color={iconColor} />
        </ButtonIcon>
      )}
    </View>
  );
};

export default Header;
