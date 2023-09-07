import React from "react";
import { Text, View, Image } from "react-native";
import { getAllItemsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import customStyles from "../../../../v0.1/styles/customStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import ButtonSale from "../ButtonSale";

const { textBlack, mainColor, secondaryColor, secondaryColorBorder, textBlue } =
  customStyles;

interface Props {
  data: getAllItemsResponseDto[0];
  setProducts: (products: Product[]) => void;
  products: Product[];
}

interface Product {
  id: string;
  price: number;
  quantity: number;
}

const AddProduct = ({ data, setProducts, products }: Props) => {
  return (
    <View
      style={{
        backgroundColor: secondaryColor,
        borderRadius: 15,
        marginTop: 20,
        borderColor: secondaryColorBorder,
        borderWidth: 1,
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
            <ButtonSale
              stock={"stock" in data ? data.stock : 0}
              setProducts={setProducts}
              data={data}
              products={products}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddProduct;
