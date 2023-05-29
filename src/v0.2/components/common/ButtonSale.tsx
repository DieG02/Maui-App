import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { getAllItemsResponseDto } from "../../../../Maui-Backend/src/controllers/types";

interface Product {
  id: string;
  price: number;
  quantity: number;
}

interface Props {
  stock: number;
  setProducts: (products: Product[]) => void;
  data: getAllItemsResponseDto[0];
  products: Product[];
}

const ButtonSale = ({ stock, setProducts, data, products }: Props) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(1);

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        id: data.id,
        price: data.retailPrice,
        quantity: 1,
      },
    ]);
    setShow(false);
  };

  const handlePlus = () => {
    setValue(value + 1);
    setProducts([
      ...products.filter((product) => product.id !== data.id),
      {
        id: data.id,
        price: data.retailPrice,
        quantity: value,
      },
    ]);
  };

  const handleMinus = () => {
    if (value < stock) {
      setValue(value - 1);
      setProducts([
        ...products.filter((product) => product.id !== data.id),
        {
          id: data.id,
          price: data.retailPrice,
          quantity: value - 1,
        },
      ]);
    }
  };

  return (
    <>
      {show ? (
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            borderColor: "#60708F",
            borderWidth: 1,
            width: 90,
            height: 30,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#60708F" }}>Agregar</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View
            style={{
              borderColor: "#60708F",
              borderWidth: 1.5,
              width: 90,
              height: 30,
              borderRadius: 20,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={handleMinus}
              style={{
                height: 27,
                width: 32,
                borderRightColor: "#60708F",
                borderRightWidth: 1.5,
                borderTopStartRadius: 20,
                borderBottomStartRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#FD6363" }}>-</Text>
            </TouchableOpacity>
            <TextInput
              value={value.toString()}
              onChangeText={(text) => setValue(parseInt(text))}
              keyboardType="numeric"
              style={{
                width: 26,
                height: 40,
                textAlign: "center",
                color: "#60708F",
              }}
              onBlur={() => {
                if (Number(value) > stock) {
                  setValue(stock);
                }
              }}
            />
            <TouchableOpacity
              onPress={handlePlus}
              style={{
                height: 27,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderLeftColor: "#60708F",
                borderLeftWidth: 1.5,
                borderTopEndRadius: 20,
                borderBottomEndRadius: 20,
              }}
            >
              <Text style={{ color: "#60708F" }}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default ButtonSale;
