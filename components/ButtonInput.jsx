import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export default function ButtonInput({
  name,
  onPress,
  children,
  value,
  bottom,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: "#ECECED",
        borderWidth: 1.8,
        height: 50,
        borderRadius: 10,
        marginBottom: bottom,
        marginTop: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          height: 50,
        }}
      >
        {children}
        {value !== undefined ? (
          <Text style={{ color: "#131313" }}>{value}</Text>
        ) : (
          <Text style={{ color: "#c4c4c4" }}>{name}</Text>
        )}
        <Icon name="chevron-small-right" size={40} color="#9F9F9F" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
