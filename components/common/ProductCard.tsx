import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";

const { mainColor } = globalStyles;

interface Props {
  onPress: () => void;
  data: IProduct;
}

const ProductCard = ({ onPress, data }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#F9F9F9",
        height: 260,
        width: "47%",
        borderRadius: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Image
          resizeMode="contain"
          source={{
            uri: data.image,
          }}
          style={{ width: "100%", height: 100, alignSelf: "center" }}
        />
        <Text
          style={{
            color: mainColor,
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 8,
            marginBottom: 4,
          }}
        >
          {data.price}
        </Text>
        <Text style={{ color: "#302F3C", height: 60 }}>{data.description}</Text>
        <Text
          style={{
            color: mainColor,
            fontWeight: "bold",
            marginVertical: 5,
          }}
        >
          Stock: {data.stock}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
