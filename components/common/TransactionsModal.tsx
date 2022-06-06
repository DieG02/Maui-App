import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
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

  console.log("data1 ==> ", data?.category);

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
            height: 450,
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
              {/* <Icon1 name={data.icon} size={30} color={data.color} /> */}
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1255/1255986.png?w=1380&t=st=1654300895~exp=1654301495~hmac=45b46434561dc28bf1924a2c7388c4835ac5f91b59a7ce3f624f943d80d7e98c",
                }}
                style={{ width: 25, height: 25 }}
              />
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
                {data?.categoryId ? data.category?.name : "Venta"}
              </Text>
              {data.categoryId && (
                <TouchableOpacity>
                  <Text style={{ color: mainColor }}>Cambiar</Text>
                </TouchableOpacity>
              )}
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
                {/* <Icon1 name={data.icon} size={30} color={data.color} /> */}
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1255/1255986.png?w=1380&t=st=1654300895~exp=1654301495~hmac=45b46434561dc28bf1924a2c7388c4835ac5f91b59a7ce3f624f943d80d7e98c",
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
                  {data?.categoryId ? data.category?.name : "Venta"}
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
