import React, { useState } from "react";
import { Text, View, Dimensions, StatusBar, Platform } from "react-native";
import InputForm from "../../components/common/InputForm";
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import { useMutation, useQuery } from "react-query";
import { createNewProduct } from "../../services/products";
import { createNewService } from "../../services/services";
import {
  createNewProductBodyInputDto,
  createServiceBodyInputDto,
} from "../../../../Maui-Backend/src/controllers/types";
import globalStyles from "../../styles/globalStyles";
import { getItemCategories } from "../../services/itemCategories";
import Button from "../../components/common/Button";
import ScrollContainer from "../../components/containers/ScrollContainer";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";

const { width } = Dimensions.get("window");

const { secondaryColor, item } = globalStyles;
interface Props {
  navigation: NavigationProp<any, any>;
}

const ITEM = ["Producto", "Servicio"];

const UNITS = [
  { name: "Unidad", value: "UNIT" },
  { name: "Kilogramo", value: "KILOGRAM" },
  { name: "Litro", value: "LITER" },
  { name: "Otro", value: "OTHER" },
];

const NewIncome = ({ navigation }: Props) => {
  const { data: itemCategories } = useQuery(
    "itemCategories",
    getItemCategories
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [costUnit, setCostUnit] = useState("");
  const [isProduct, setIsProduct] = useState(ITEM[0]);
  const [category, setCategory] = useState("Seleccione una categoría");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Ingrese el valor");
  const [modalState, setModalState] = useState(false);

  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);

  const handleIdCategory = (expense: string, data: any[]) => {
    const category = data.find(
      (category: { name: string }) => category.name === expense
    );
    return category ? category.id : null;
  };

  const product: createNewProductBodyInputDto = {
    cost: +costUnit,
    description: description,
    name: name,
    quantity: +quantity,
    retailPrice: +price,
    stock: +stock,
    categoryId: itemCategories && handleIdCategory(category, itemCategories),
    unit: unit,
  };

  const service: createServiceBodyInputDto = {
    name: name,
    retailPrice: +price,
    categoryId: itemCategories && handleIdCategory(category, itemCategories),
    description: description,
  };

  const { mutateAsync: createProduct } = useMutation(createNewProduct);
  const { mutateAsync: createService } = useMutation(createNewService);

  const handleSubmit = () => {
    if (isProduct === ITEM[0]) {
      createProduct(product);
    } else createService(service);
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={item} />
      <View
        style={{
          height: Platform.select({ ios: 52, android: 0 }),
          backgroundColor: Platform.select({ ios: item }),
        }}
      />
      <BackHeaderTitle
        label="Nuevo Item"
        onPressBack={() => navigation.goBack()}
        hasType
        color={item}
      />
      <ScrollContainer>
        <View style={{ marginTop: 15 }}>
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
                placeholder="Desciripción Opcional"
                name="Descripción"
                marginBottom={25}
                value={description}
                setValue={setDescription}
              />
              <OptionModal
                title="Categoría"
                options={
                  itemCategories?.map((category) => category?.name) ?? []
                }
                isModalVisible={modalExpenseCategory}
                setIsModalVisible={setModalExpenseCategory}
                selectedOption={category}
                setSelectedOption={setCategory}
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
                  <OptionModal
                    title="Contenido"
                    options={UNITS?.map((category) => category?.name) ?? []}
                    isModalVisible={modalUnit}
                    setIsModalVisible={setModalUnit}
                    selectedOption={unit}
                    setSelectedOption={setUnit}
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
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <CommonInput
                placeholder="¿Como quieres llamar a este servicio?"
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
                placeholder="Desciripción Opcional"
                name="Descripción"
                marginBottom={25}
                value={description}
                setValue={setDescription}
              />
              <OptionModal
                title="Categoría"
                options={
                  itemCategories?.map((category) => category?.name) ?? []
                }
                isModalVisible={modalExpenseCategory}
                setIsModalVisible={setModalExpenseCategory}
                selectedOption={category}
                setSelectedOption={setCategory}
              />
            </>
          )}
        </View>
      </ScrollContainer>
      <View
        style={{
          width: "100%",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Button
          onPress={handleSubmit}
          text="Registrar item"
          style={{
            backgroundColor: "#B3B3B3",
            width: width - 60,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default NewIncome;
