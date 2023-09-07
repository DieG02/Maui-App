import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

interface Props {
  title: string;
  enable?: boolean;
  onPress?: () => void;
  label?: string;
}

const Title = ({ title, onPress, label, enable }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
      {enable && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.textAction}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Title;
