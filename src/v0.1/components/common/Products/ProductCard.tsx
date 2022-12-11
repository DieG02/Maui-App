import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getAllItemsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import customStyles from "../../../styles/customStyles";
import Icon from "react-native-vector-icons/FontAwesome5";

const { textBlack, mainColor, secondaryColor, secondaryColorBorder, textBlue } =
  customStyles;

interface Props {
  onPress?: () => void;
  data: getAllItemsResponseDto[0];
}

const ProductCard = ({ onPress, data }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: secondaryColor,
        borderRadius: 15,
        marginTop: 15,
        borderColor: secondaryColorBorder,
        borderWidth: 1.5,
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
        <View style={{ marginRight: 20 }}>
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
                backgroundColor: textBlue,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="file-image" size={40} color="white" />
            </View>
          )}
        </View>
        <View
          style={{
            marginVertical: 10,
            width: "72%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-SemiBold",
              color: textBlack,
            }}
          >
            {data.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View>
              {"stock" in data && (
                <Text
                  style={{
                    color: mainColor,
                    fontSize: 16,
                    fontFamily: "Gilroy-SemiBold",
                    marginVertical: 5,
                  }}
                >
                  {data.stock} disponibles
                </Text>
              )}
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Gilroy-SemiBold",
                  color: textBlack,
                }}
              >
                $ {data.retailPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
