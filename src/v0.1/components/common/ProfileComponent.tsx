import { View, Text, Image } from "react-native";
import React from "react";
import customStyles from "../../styles/customStyles";
import { getInitialLetters } from "../../utils/helper";

const { textBlack } = customStyles;

interface Props {
  userName: string;
  userLastName: string;
  imgProfile?: string;
  email: string;
}

const ProfileComponent = ({
  userName,
  userLastName,
  imgProfile,
  email,
}: Props) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#7888a8",
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imgProfile ? (
          <Image
            source={{ uri: imgProfile }}
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {getInitialLetters(userName, userLastName)}
          </Text>
        )}
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: textBlack,
            fontFamily: "Gilroy-Medium",
            marginTop: 20,
          }}
        >
          {userName} {userLastName}
        </Text>
        <Text
          style={{
            color: textBlack,
            fontFamily: "Gilroy-Regular",
            marginTop: 5,
            fontSize: 18,
          }}
        >
          {email}
        </Text>
      </View>
    </View>
  );
};

export default ProfileComponent;
