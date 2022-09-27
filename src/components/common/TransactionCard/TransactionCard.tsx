import React, { useState } from "react";
import { View, Alert, ActivityIndicator } from "react-native";

import { getTransactionsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { useMutation, useQueryClient } from "react-query";
import { deleteExpense } from "../../../services/expenses";
import { deleteIncome } from "../../../services/incomes";
import TransactionComponent from "./TransactionComponent";
import TransactionModal from "./TransactionsModal";

interface Props {
  data: getTransactionsResponseDto[0];
}

const TransactionCard = ({ data }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: deleteOutcome, isLoading } = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
      queryClient.invalidateQueries("transactionsBalance");
    },
  });
  const { mutateAsync: deleteSale, isLoading: isLoadingIncome } = useMutation(
    deleteIncome,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
        queryClient.invalidateQueries("transactionsBalance");
      },
    }
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = (category: string, id: string) => {
    if (category !== "Venta") {
      deleteOutcome(id);
    } else {
      deleteSale(id);
    }
  };

  const handleMenuDelete = (category: string, id: string) => {
    setModalVisible(false);
    Alert.alert(
      "Eliminar",
      "¿Estás seguro que deseas eliminar esta transacción?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete(category, id) },
      ]
    );
  };

  if (isLoading || isLoadingIncome) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#141414" />
      </View>
    );
  }

  return (
    <View>
      <TransactionModal
        data={data}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleMenuDelete={handleMenuDelete}
      />
      <TransactionComponent onPress={() => toggleModal()} data={data} />
    </View>
  );
};

export default TransactionCard;
