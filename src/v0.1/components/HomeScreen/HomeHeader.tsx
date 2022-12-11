import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import customStyles from "../../styles/customStyles";

const { mainColor, textBlack, background } = customStyles;

interface Props {
  onPressNotifications: () => void;
  onPressUser: () => void;
  avatar: string;
  welcome: string;
}

const HomeHeader = ({ onPressUser, avatar, welcome }: Props) => {
  return (
    <View
      style={{
        marginLeft: 30,
        marginRight: 22,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        height: 60,
      }}
    >
      <TouchableOpacity
        onPress={onPressUser}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 60,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: mainColor,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-SemiBold",
              color: background,
            }}
          >
            {avatar}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Gilroy-SemiBold",
            color: textBlack,
            paddingLeft: 10,
          }}
        >
          {welcome}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
