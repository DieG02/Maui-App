import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getAllItemsResponseDto } from "../../../../Maui-Backend/src/controllers/types";
import globalStyles from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import ButtonSale from "./ButtonSale";

const { secondaryColor, mainColor } = globalStyles;

interface Props {
  onPress?: () => void;
  data: getAllItemsResponseDto[0];
  isAdd?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
}

const ProductCard = ({ onPress, data, isAdd, disabled }: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: "#F9F9F9",
        borderRadius: 15,
        marginTop: 15,
        borderColor: "#f5f5f5",
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
              color: secondaryColor,
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
              {"stock" in data ? (
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
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy-SemiBold",
                    marginVertical: 5,
                    color: "#FF8000",
                  }}
                >
                  Servicio
                </Text>
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
            {isAdd && (
              <ButtonSale
                isService={"stock" in data}
                stock={"stock" in data ? data.stock : 0}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
