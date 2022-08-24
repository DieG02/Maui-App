import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getAllItemsResponseDto } from "../../../../Maui-Backend/src/controllers/types";
import globalStyles from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome5";

const { secondaryColor, mainColor } = globalStyles;

interface Props {
  onPress?: () => void;
  data: getAllItemsResponseDto[0];
}

const ProductCard = ({ onPress, data }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#F9F9F9",
        borderRadius: 15,
        marginTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 40,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            marginVertical: 20,
            width: "70%",
            marginRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-SemiBold",
              color: secondaryColor,
            }}
          >
            {data.name}
          </Text>
          {"stock" in data ? (
            <Text
              style={{
                color: mainColor,
                fontSize: 16,
                fontFamily: "Gilroy-SemiBold",
                marginVertical: 5,
              }}
            >
              Stock: {data.stock}
            </Text>
          ) : (
            <View
              style={{
                backgroundColor: "#FF8000",
                borderRadius: 15,
                paddingHorizontal: 10,
                width: 90,
                marginVertical: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Gilroy-SemiBold",
                  marginVertical: 5,
                }}
              >
                Servicio
              </Text>
            </View>
          )}
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Gilroy-SemiBold",
              color: secondaryColor,
            }}
          >
            $ {data.retailPrice}
          </Text>
        </View>
        {data.image ? (
          <Image
            resizeMode="contain"
            source={{
              uri: data.image,
            }}
            style={{ width: 70, height: 70 }}
          />
        ) : (
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: "#60708F",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="file-image" size={40} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
