import { Image, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import RowTransaction from "../../components/common/TransactionCard/RowTransaction";
import Button from "../../components/common/Button";
import ScrollContainer from "../../components/containers/ScrollContainer";

import useDeleteExpense from "../../services/Expense/useDeleteExpense";
import useDeleteIncome from "../../services/Incomes/useDeleteIncome";
import { queryClient } from "../../utils/queryClient";
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";

// TODO: Refactor this component
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const { secondaryColor, textBlack, width, textBlue } = customStyles;

const TransactionDetail = ({ route, navigation }: Props) => {
  const { params } = route;

  const [isVisible, setVisible] = useState(false);
  const toggleModal = () => {
      setVisible(!isVisible);
  };

  const flag = params?.item.category.name !== "Venta";

  const showToast = () => {
    if (flag) {
      ToastAndroid.show(
        "El egreso fue eliminado satisfactoriamente",
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show(
        "El ingreso fue eliminado satisfactoriamente",
        ToastAndroid.SHORT
      );
    }
  };

  const { mutateAsync: deleteExpense } = useDeleteExpense(params?.item.id, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries("Transactions");
    },
  });
  const { mutateAsync: deleteIncome } = useDeleteIncome(params?.item.id, {
    onSuccess() {
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries("Transactions");
    },
  });

  const handleDelete = () => {
    flag ? deleteExpense() : deleteIncome();
    toggleModal();
  };

  const handleOnPress = () => {
    flag?navigation.navigate('EditExpense', {expense:params?.item}) : navigation.navigate('EditIncome', {income: params?.item})
  }

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Detalle de operación"
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={toggleModal}
      />
      <ConfirmationModal
        title="¿Estás seguro de eliminarlo?"
        isVisible={isVisible}
        cancel={toggleModal}
        confirm={handleDelete}
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
              ? `${params?.item.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}`
              
              : `-${params?.item.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}`
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
          onPress={handleOnPress}
        />
      </View>
    </ScreenContainer>
  );
};

export default TransactionDetail;
