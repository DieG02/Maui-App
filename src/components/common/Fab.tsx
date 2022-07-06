import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface Props {
  right?: number;
  bottom?: number;
  left?: number;
  width?: number;
  color?: string;
  text?: string;
  marginLeft?: number;
  marginRight?: number;
  onPress?: () => void;
  height?: number;
  position?: "absolute" | "relative";
}

const Fab = ({
  right,
  bottom,
  left,
  width,
  color,
  text,
  marginLeft,
  marginRight,
  onPress,
  height,
  position,
}: Props) => {
  const styles = StyleSheet.create({
    fab: {
      position: position || "absolute",
      marginBottom: 10,
      marginLeft: marginLeft,
      marginRight: marginRight,
      right: right,
      bottom: bottom,
      left: left,
      backgroundColor: color,
      width: width,
      elevation: 0,
      height: height,
    },
  });
  return (
    <FAB
      style={styles.fab}
      uppercase={false}
      onPress={onPress}
      label={text}
      color="white"
      icon={""}
    />
  );
};

export default Fab;
