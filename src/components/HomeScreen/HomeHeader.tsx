import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Bell from "react-native-vector-icons/Fontisto";
import globalStyles from "../../styles/globalStyles";

const { mainColor, textBlack, background } = globalStyles;

interface Props {
  onPressNotifications: () => void;
  onPressUser: () => void;
  avatar: string;
  welcome: string;
}

const HomeHeader = ({
  onPressNotifications,
  onPressUser,
  avatar,
  welcome,
}: Props) => {
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
        backgroundColor: background,
      }}
    >
      <TouchableOpacity
        onPress={onPressUser}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
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
      <TouchableOpacity
        onPress={onPressNotifications}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: mainColor,
            position: "absolute",
            zIndex: 90,
            top: 3,
            right: 6,
          }}
        />
        <Bell name="bell" size={28} color={textBlack} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
