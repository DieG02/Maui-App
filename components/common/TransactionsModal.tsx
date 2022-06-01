import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import globalStyles from "../../styles/globalStyles";

const { mainColor, secondaryColor } = globalStyles;

interface Props {
  data: ITransaction;
}

const TransactionModal = ({ data }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  console.log("data1 ==> ", data);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
            height: 500,
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
                backgroundColor: data.color || mainColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon1 name={data.icon} size={35} color="white" />
            </View>
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

            <Text style={{ color: "#8a8a8a", marginBottom: 10 }}>
              30 de Agosto de 2022 - 15:30hs
            </Text>
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
                style={{ color: mainColor, fontSize: 16, fontWeight: "600" }}
              >
                Tarjeta de crédito
              </Text>
            </View>
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
              <Text style={{ color: "#666666", fontSize: 15 }}>
                Ver más detalles
              </Text>
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
                Descargar comprobante
              </Text>
              <Icon name="chevron-right" size={25} color="#666666" />
            </TouchableOpacity>
            <View
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
              <Text style={{ color: "#666666", fontSize: 15 }}>Compra</Text>
              <TouchableOpacity>
                <Text style={{ color: mainColor }}>Cambiar</Text>
              </TouchableOpacity>
            </View>
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
              // backgroundColor: 'red',
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // backgroundColor: 'red',
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
                <Icon1 name={data.icon} size={30} color={data.color} />
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
                    fontWeight: "500",
                    color: secondaryColor,
                  }}
                >
                  {data.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Regular",
                    color: "#D7DCE4",
                  }}
                >
                  {data.type}
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
              <Text
                style={{
                  fontSize: 17,
                  color: secondaryColor,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                {data?.categoryId ? `-$ ${data?.value}` : `$ ${data?.value}`}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Gilroy-Regular",
                  color: "#D7DCE4",
                }}
              >
                {data?.paymentMethod}
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
    height: 70,
    backgroundColor: "white",
  },
});

export default TransactionModal;
