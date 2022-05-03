import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import logo from "../../assets/logo.png";

// const logo = require("../assets/logo.png");

type Props = {
  onPressNotifications: () => void;
  onPressUser: () => void;
};

const HomeHeader = ({ onPressNotifications, onPressUser }: Props) => {
  return (
    <View
      style={{
        marginHorizontal: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <TouchableOpacity
        onPress={onPressUser}
        style={{
          width: 50,
          height: 50,
          borderColor: "#F0F1F5",
          borderWidth: 1.5,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="user" size={30} color="#60708F" />
      </TouchableOpacity>
      <Image source={logo} style={{ width: 100, height: 30 }} />
      <TouchableOpacity
        onPress={onPressNotifications}
        style={{
          width: 50,
          height: 50,
          borderColor: "#F0F1F5",
          borderWidth: 1.5,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="bell" size={30} color="#60708F" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
