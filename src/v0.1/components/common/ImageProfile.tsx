import { View, Image, Text } from "react-native";
import { getInitialLetters } from "../../utils/helper";
import React from "react";
import customStyles from "../../styles/customStyles";

interface Props {
  url?: string;
  name: string;
}

const { mainColor } = customStyles;

const ImageProfile = ({ url, name }: Props) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          backgroundColor: mainColor,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {url !== null && url ? (
          <Image
            source={{ uri: url }}
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
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
            {getInitialLetters(name)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ImageProfile;
