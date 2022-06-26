import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import InputForm from "../../components/common/InputForm";
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import { FAB } from "react-native-paper";

import { useMutation } from "react-query";
import { createNewProduct } from "../../services/products";
import {
  createNewProductBodyInputDto,
  // createServiceBodyInputDto,
} from "../../../Maui-Backend/src/controllers/types";
import globalStyles from "../../styles/globalStyles";

const { width } = Dimensions.get("window");

const { mainColor, secondaryColor } = globalStyles;
interface Props {
  navigation: NavigationProp<any, any>;
}

const ITEM = ["Producto", "Servicio"];

const NewIncome = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [description, setDescription] = useState("");
  const [costUnit, setCostUnit] = useState("");
  const [isProduct, setIsProduct] = useState(ITEM[0]);
  const [category, setCategory] = useState("Seleccione una categoría");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [modalState, setModalState] = useState(false);

  // const queryClient = useQueryClient();

  // const isPaidState = useMemo(() => {
  //   if (isProduct === "Producto") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }, [isProduct]);

  const form: createNewProductBodyInputDto = {
    retailPrice: +price,
    name: name,
    stock: +stock,
  };

  // const servicio: createServiceBodyInputDto = {
  //   name: "servicio",
  //   image: "image",
  //   retailPrice: 1,
  // };

  const { mutateAsync } = useMutation(
    (form: createNewProductBodyInputDto) => {
      return createNewProduct({
        name: form.name,
        retailPrice: form.retailPrice,
        stock: form.stock,
      });
    }
    // {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries("transactions");
    //     queryClient.invalidateQueries("balance");
    //     queryClient.invalidateQueries("getMonthlyStats");
    //   },
    // }
  );

  const handleSubmit = (form: createNewProductBodyInputDto) => {
    console.log("Form", JSON.stringify(form, null, 2));

    mutateAsync(form);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={mainColor} />
      <View
        style={{
          height: Platform.select({ ios: 52, android: 0 }),
          backgroundColor: Platform.select({ ios: mainColor }),
        }}
      />
      <View
        style={{
          backgroundColor: mainColor,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <Header
          titleColor="white"
          name="Registrar Item"
          color={mainColor}
          icon={
            <Icon onPress={() => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color="white" />
            </Icon>
          }
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}
      >
        <View style={{ marginBottom: 60, marginTop: 15 }}>
          <Text
            style={{
              fontSize: 18,
              color: secondaryColor,
              fontFamily: "Gilroy-Bold",
              marginBottom: 10,
            }}
          >
            Imagen
          </Text>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <View
              style={{
                backgroundColor: "beige",
                height: 157,
                width: 157,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Imagen</Text>
            </View>
          </View>
          <OptionModal
            title="Tipo de Item"
            options={ITEM}
            isModalVisible={modalState}
            setIsModalVisible={setModalState}
            selectedOption={isProduct}
            setSelectedOption={setIsProduct}
          />
          {isProduct === "Producto" ? (
            <>
              <CommonInput
                placeholder="¿Como quieres llamar a este producto?"
                name="Nombre del Producto"
                marginBottom={25}
                value={name}
                setValue={setName}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    width: (width - 100) / 2,
                  }}
                >
                  <InputForm
                    keyboardType="numeric"
                    placeholder="0,00"
                    value={price}
                    name="Valor"
                    setValue={setPrice}
                    marginBottom={25}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    width: (width - 100) / 2,
                  }}
                >
                  <CommonInput
                    placeholder="Ingrese el valor"
                    name="Stock"
                    marginBottom={25}
                    value={stock}
                    setValue={setStock}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <CommonInput
                placeholder="¿Como quieres llamar a este ingreso?"
                name="Descripción"
                marginBottom={25}
                value={description}
                setValue={setDescription}
              />

              <CommonInput
                placeholder="Ingrese el valor"
                name="Categoría"
                marginBottom={25}
                value={category}
                setValue={setCategory}
              />
              <InputForm
                keyboardType="numeric"
                placeholder="0,00"
                value={costUnit}
                name="Costo Unitario"
                setValue={setCostUnit}
                marginBottom={25}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    width: (width - 100) / 2,
                  }}
                >
                  <CommonInput
                    placeholder="Ingrese el valor"
                    name="Contenido"
                    marginBottom={25}
                    value={unit}
                    setValue={setUnit}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    width: (width - 100) / 2,
                  }}
                >
                  <CommonInput
                    placeholder="Ingrese el valor"
                    name="Cantidad"
                    marginBottom={25}
                    value={quantity}
                    setValue={setQuantity}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <CommonInput
                placeholder="¿Como quieres llamar a este producto?"
                name="Nombre del Servicio"
                marginBottom={25}
                value={name}
                setValue={setName}
              />
              <InputForm
                keyboardType="numeric"
                placeholder="0,00"
                value={price}
                name="Valor"
                setValue={setPrice}
                marginBottom={25}
              />

              <CommonInput
                placeholder="¿Como quieres llamar a este ingreso?"
                name="Descripción"
                marginBottom={25}
                value={description}
                setValue={setDescription}
              />

              <CommonInput
                placeholder="Ingrese el valor"
                name="Categoría"
                marginBottom={25}
                value={category}
                setValue={setCategory}
              />
            </>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 90,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <FAB
          color="white"
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            elevation: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#B3B3B3",
          }}
          small={false}
          icon="check"
          onPress={() => handleSubmit(form)}
        />
      </View>
    </View>
  );
};
export default NewIncome;
