import React, { useState } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  ToastAndroid,
} from "react-native";
import InputForm from "../../v0.1/components/common/InputForm";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import CommonInput from "../../v0.1/components/common/CommonInput";
import OptionModal from "../../v0.1/components/common/OptionModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import customStyles from "../../v0.1/styles/customStyles";
import { getItemCategories } from "../../v0.1/services/itemCategories";
import Button from "../../v0.1/components/common/Button";
import ScrollContainer from "../../v0.1/components/containers/ScrollContainer";
import ScreenContainer from "../../v0.1/components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../v0.1/components/common/HeaderTitle";
import Icon from "react-native-vector-icons/FontAwesome5";
import { updateProductById } from "../../v0.1/services/products";
import { EditProductBodyInputGuard } from "../../../../Maui-Backend/src/controllers/products/editProduct/input.dto";

const { width } = Dimensions.get("window");

const { item, textBlue, mainColor } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const UNITS = [
  { name: "Unidad", value: "UNIT" },
  { name: "Kilogramo", value: "KILOGRAM" },
  { name: "Litro", value: "LITER" },
  { name: "Otro", value: "OTHER" },
];

const ProductDetail = ({ route, navigation }: Props) => {
  const { params } = route;

  const { data: itemCategories } = useQuery(
    "itemCategories",
    getItemCategories
  );
  const queryClient = useQueryClient();

  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);

  const handleReverseIdCategory = (id: string, data: any[]) => {
    const category = data.find(
      (category: { id: string }) => category.id === id
    );
    return category ? category.name : null;
  };

  const handleIdCategory = (expense: string, data: any[]) => {
    const category = data.find(
      (category: { name: string }) => category.name === expense
    );
    return category ? category.id : null;
  };

  const initialProduct = {
    name: params?.item.name || "",
    price: params?.item.retailPrice || "",
    stock: params?.item.stock || "",
    description: params?.item.description || "",
    cost: params?.item.cost || "",
    category:
      (itemCategories &&
        handleReverseIdCategory(params?.item.categoryId, itemCategories)) ||
      "Seleccione una categoría",
    quantity: params?.item.quantity || "",
    unit: params?.item.unit || "Ingrese el valor",
    image: params?.item.image || "",
  };

  const [product, setProduct] = useState(initialProduct);

  const isChanged = JSON.stringify(initialProduct) !== JSON.stringify(product);

  const data: EditProductBodyInputGuard = {
    name: product.name,
    retailPrice: +product.price,
    cost: product.cost,
    unit: product.unit,
    quantity: +product.quantity,
    image: product.image,
    stock: +product.stock,
    description: product.description,
    categoryId:
      itemCategories && handleIdCategory(product.category, itemCategories),
  };

  console.log("product", product);

  const showToast = () => {
    ToastAndroid.show(
      "El contacto fue editado satisfactoriamente",
      ToastAndroid.SHORT
    );
  };

  const { mutateAsync: updateProduct } = useMutation(
    () => updateProductById(params?.item.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
        navigation.goBack();
        showToast();
      },
    }
  );

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
        label="Detalle del producto"
        onPressBack={() => navigation.goBack()}
        withDelete
      />
      <ScrollContainer>
        <View style={{ marginTop: 15 }}>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            {product.image ? (
              <Image
                resizeMode="contain"
                source={{
                  uri: product.image,
                }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
            ) : (
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                  backgroundColor: textBlue,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="file-image" size={60} color="white" />
              </View>
            )}
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
                value={product.price.toString()}
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
                value={product.stock.toString()}
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
            value={product.cost.toString()}
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
                value={product.quantity.toString()}
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
          disabled={!isChanged}
          onPress={() => updateProduct()}
          text="Actualizar producto"
          style={{
            backgroundColor: isChanged ? mainColor : "#B3B3B3",
            borderRadius: 25,
            elevation: 0,
            width: width - 40,
            marginTop: 6,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default ProductDetail;
