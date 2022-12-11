import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import customStyles from "../../../styles/customStyles";

const { textBlack, secondaryColorBorder, secondaryColor, textOutline } =
  customStyles;

interface Props {
  onPress?: () => void;
  marginBottom?: number;
  marginTop?: number;
}

const ProductModal = ({ onPress, marginBottom, marginTop }: Props) => {
  return (
    <View style={{ marginBottom: marginBottom, marginTop: marginTop }}>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: "Gilroy-Bold",
          marginBottom: 10,
        }}
      >
        Productos
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 70,
          borderRadius: 12,
          borderColor: secondaryColorBorder,
          backgroundColor: secondaryColor,
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/685/685388.png",
            }}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <Text
          style={{
            marginLeft: 20,
            color: textOutline,
            fontFamily: "Gilroy-Bold",
          }}
        >
          Seleccionar productos
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductModal;
