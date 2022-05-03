import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("screen");

const ancho = () => {
  var division = (width - 60) / 2;
  return division;
};

interface Props {
  onPress: () => void;
  text: string;
  style?: object;
}

const Button = ({ style, text, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.root, style]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: ancho(),
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Button;
