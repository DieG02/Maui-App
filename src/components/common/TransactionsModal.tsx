import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import globalStyles from "../../styles/globalStyles";
import { getTransactionsResponseDto } from "../../../../Maui-Backend/src/controllers/types";
import { paymentsMethod } from "../../utils/translate";
import { useMutation, useQueryClient } from "react-query";
import { deleteExpense } from "../../services/expenses";
import { deleteIncome } from "../../services/incomes";

const { mainColor, secondaryColor } = globalStyles;

interface Props {
  data: getTransactionsResponseDto[0];
}

const TransactionModal = ({ data }: Props) => {
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
      <Modal
        isVisible={isModalVisible}
        useNativeDriverForBackdrop={true}
        swipeDirection={["down"]}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.view}
      >
        <View
          style={{
            backgroundColor: "white",
            height: data.category.name !== "Venta" ? 450 : 380,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View
            style={{
              alignItems: "center",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Icon name="chevron-small-down" color="#302F3C" size={30} />
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ECECED",
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon2 name="pen" size={25} color="#ACACAC" />
            </TouchableOpacity>

            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginHorizontal: 30,
                backgroundColor: "#F9FAFB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: data.category?.imageUrl,
                }}
                style={{ width: 35, height: 35 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleMenuDelete(data.category.name, data.id)}
              style={{
                backgroundColor: "#ECECED",
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon2 name="trash" size={25} color="#ACACAC" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: "#4c4c4c",
                fontWeight: "bold",
              }}
            >
              $ {data.value}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#666666",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {data.name}
            </Text>
            <Text style={{ color: "black", marginBottom: 10 }}>
              {data.date}
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 10,
                width: "80%",
                height: 56,
                borderWidth: 1.8,
                borderRadius: 10,
                borderColor: "#f5f5f5",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 25,
              }}
            >
              <Text style={{ color: "#666666", fontSize: 15 }}>Ver más</Text>
              <Icon name="chevron-right" size={25} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                width: "80%",
                height: 56,
                borderRadius: 10,
                borderColor: "#f5f5f5",
                borderWidth: 1.8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 25,
              }}
            >
              <Text style={{ color: "#666666", fontSize: 15 }}>
                Compartir comprobante
              </Text>
              <Icon name="chevron-right" size={25} color="#666666" />
            </TouchableOpacity>
            {data.category.name !== "Venta" && (
              <View
                style={{
                  marginTop: 10,
                  width: "80%",
                  height: 56,
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 25,
                  backgroundColor: "#E6EFF8",
                }}
              >
                <Text
                  style={{
                    color: mainColor,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {data.category?.name}
                </Text>

                <TouchableOpacity>
                  <Text style={{ color: mainColor }}>Cambiar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={styles.root}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#F9FAFB",
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{
                    uri: data.category?.imageUrl,
                  }}
                  style={{ width: 25, height: 25 }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Gilroy-SemiBold",
                    color: secondaryColor,
                  }}
                >
                  {data.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Regular",
                    color: "#bdc0c3",
                  }}
                >
                  {data.date}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              {/* <Text
                style={{
                  fontSize: 18,
                  color: secondaryColor,
                  fontFamily: "Gilroy-SemiBold",
                }}
              >
                {data.category?.name === "Venta"
                  ? `$${data?.value}`
                  : `-$${data?.value}`}
              </Text> */}
              {data.category?.name === "Venta" ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: "#48bb8b",
                    fontFamily: "Gilroy-SemiBold",
                  }}
                >
                  ${data?.value}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    color: secondaryColor,
                    fontFamily: "Gilroy-SemiBold",
                  }}
                >
                  -${data?.value}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Gilroy-Regular",
                  color: "#bdc0c3",
                }}
              >
                {data.paymentMethod && paymentsMethod[data.paymentMethod].es}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  root: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: "red",
    backgroundColor: "white",
  },
});

export default TransactionModal;
