import { Image, Text, View, ToastAndroid } from "react-native";
import React from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import RowTransaction from "../../components/common/TransactionCard/RowTransaction";
import Button from "../../components/common/Button";
import ScrollContainer from "../../components/containers/ScrollContainer";
import useDeleteIncome from "../../services/Incomes/useDeleteIncome";
import { useQueryClient } from "react-query";

// TODO: Refactor this component
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const { secondaryColor, textBlack, width, textBlue } = customStyles;

const TransactionDetail = ({ route, navigation }: Props) => {
  const queryClient = useQueryClient();
  const { params } = route;

  const showToast = () => {
    ToastAndroid.show("El ingreso ha sido eliminado", ToastAndroid.SHORT);
  };

  const { mutateAsync: deleteIncome } = useDeleteIncome(params?.item.id, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries("Transactions");
    },
  });

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Detalle de operación"
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={() => deleteIncome()}
      />
      <ScrollContainer>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: secondaryColor,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <Image
              source={{ uri: params?.item.category.imageUrl }}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: textBlack,
              fontFamily: "Gilroy-SemiBold",
            }}
          >
            {params?.item.name}
          </Text>
        </View>

        <RowTransaction label="Fecha de operación" value={params?.item.date} />
        <RowTransaction
          label="Método de pago"
          value={params?.item.paymentMethod}
        />
        <RowTransaction
          label="Total"
          value={
            params?.item.category.name === "Venta"
              ? `$${params?.item.value}`
              : `-$${params?.item.value}`
          }
        />

        <RowTransaction
          label="Tipo de operación"
          value={params?.item.category.name === "Venta" ? "Venta" : "Gasto"}
        />

        {params?.item.category.name !== "Venta" && (
          <RowTransaction
            label="Categoría del gasto"
            value={params?.item.category.name}
          />
        )}
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
          text="Editar"
          style={{
            backgroundColor: textBlue,
            width: width - 60,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default TransactionDetail;
