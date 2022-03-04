import React from "react";
import { StyleSheet, onPress } from "react-native";
import { FAB } from "react-native-paper";

function Fab({
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
}) {
  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
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
    />
  );
}

export default Fab;
