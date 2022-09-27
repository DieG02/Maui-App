import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

interface Props {
  isService: boolean;
  stock: number;
}

const ButtonSale = ({ isService, stock }: Props) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState("1");

  const handleMinus = () => {
    if (value === "0") {
      return;
    }
    setValue((prev) => (Number(prev) - 1).toString());
  };
  const handlePlus = () => {
    if (value >= stock.toString()) {
      return;
    }
    setValue((prev) => (Number(prev) + 1).toString());
  };

  return (
    <>
      {show ? (
        <TouchableOpacity
          onPress={() => setShow(!show)}
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
          {isService ? (
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
                <Icon name="minus" size={20} color="#FD6363" />
              </TouchableOpacity>

              <TextInput
                value={value}
                onChangeText={(text) => setValue(text)}
                keyboardType="numeric"
                style={{
                  width: 26,
                  height: 40,
                  textAlign: "center",
                }}
                onBlur={() => {
                  if (Number(value) > stock) {
                    setValue(stock.toString());
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
                <Icon name="plus" size={20} color="#60708F" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={{
                backgroundColor: "#60708F",
                width: 90,
                height: 30,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>Agregado</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

export default ButtonSale;
