import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  name: string;
  onPress: () => void;
  textStyle?: string;
  containerStyle?: string;
}

const ChipCategory = ({ name, onPress, textStyle, containerStyle }: Props) => {
  const styles = StyleSheet.create({
    text: {
      marginHorizontal: 20,
      fontSize: 18,
      color: textStyle,
      fontWeight: "500",
    },
    container: {
      backgroundColor: containerStyle,
      borderRadius: 20,
      justifyContent: "center",
      marginRight: 10,
      height: 40,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ChipCategory;
