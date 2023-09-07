import React, { useState } from "react";
import { Text, View, Dimensions, StatusBar, Platform } from "react-native";
import InputForm from "../../v0.1/components/common/InputForm";
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../v0.1/components/common/CommonInput";
import OptionModal from "../../v0.1/components/common/OptionModal";
import { useMutation, useQuery } from "react-query";
import { createNewProduct } from "../../v0.1/services/products";
import { createNewProductBodyInputDto } from "../../../../Maui-Backend/src/controllers/types";
import customStyles from "../../v0.1/styles/customStyles";
import { getItemCategories } from "../../v0.1/services/itemCategories";
import Button from "../../v0.1/components/common/Button";
import ScrollContainer from "../../v0.1/components/containers/ScrollContainer";
import ScreenContainer from "../../v0.1/components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../v0.1/components/common/HeaderTitle";

const { width } = Dimensions.get("window");

const { item, textBlack } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
}

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

  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    cost: "",
    category: "Seleccione una categoría",
    quantity: "",
    unit: "Ingrese el valor",
  });

  const handleIdCategory = (expense: string, data: any[]) => {
    const category = data.find(
      (category: { name: string }) => category.name === expense
    );
    return category ? category.id : null;
  };

  const data: createNewProductBodyInputDto = {
    ...product,
    quantity: +product.quantity,
    retailPrice: +product.price,
    stock: +product.stock,
    cost: +product.cost,
    categoryId:
      itemCategories && handleIdCategory(product.category, itemCategories),
  };

  const { mutateAsync: createProduct } = useMutation(createNewProduct);

  const handleSubmit = () => {
    createProduct(data);
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
              color: textBlack,
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
          <CommonInput
            placeholder="¿Como quieres llamar a este producto?"
            name="Nombre del Producto"
            marginBottom={25}
            setValue={(value) => setProduct({ ...product, name: value })}
            value={product.name}
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
                name="Valor"
                value={product.price}
                setValue={(value) => setProduct({ ...product, price: value })}
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
                value={product.stock}
                setValue={(value) => setProduct({ ...product, stock: value })}
                keyboardType="numeric"
              />
            </View>
          </View>
          <CommonInput
            placeholder="Desciripción Opcional"
            name="Descripción"
            marginBottom={25}
            value={product.description}
            setValue={(value) => setProduct({ ...product, description: value })}
          />
          <OptionModal
            title="Categoría"
            options={itemCategories?.map((category) => category?.name) ?? []}
            isModalVisible={modalExpenseCategory}
            setIsModalVisible={setModalExpenseCategory}
            selectedOption={product.category}
            setSelectedOption={(value) =>
              setProduct({ ...product, category: value })
            }
          />
          <InputForm
            keyboardType="numeric"
            placeholder="0,00"
            name="Costo Unitario"
            value={product.cost}
            setValue={(value) => setProduct({ ...product, cost: value })}
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
                selectedOption={product.unit}
                setSelectedOption={(value) =>
                  setProduct({ ...product, unit: value })
                }
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
                value={product.quantity}
                setValue={(value) =>
                  setProduct({ ...product, quantity: value })
                }
                keyboardType="numeric"
              />
            </View>
          </View>
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
