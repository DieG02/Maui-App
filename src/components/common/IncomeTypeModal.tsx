import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import globalStyles from "../../styles/globalStyles";

const {
  textBlack,
  textBlue,
  background,
  secondaryColorBorder,
  secondaryColor,
} = globalStyles;

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onPressSale: () => void;
  onPressProduct: () => void;
}

const IncomeTypeModal = ({
  isModalVisible,
  setModalVisible,
  onPressProduct,
  onPressSale,
}: Props) => {
  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      coverScreen={true}
      swipeDirection={["down"]}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      //   onBackButtonPress={() => setModalVisible(false)}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
      <View
        style={{
          backgroundColor: background,
          height: 280,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            height: 30,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: secondaryColorBorder,
              height: 5,
              width: 70,
              borderRadius: 5,
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: textBlack,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            Nueva Venta
          </Text>
          <Text style={{ color: textBlack, marginBottom: 10 }}>
            Seleccione el tipo de venta
          </Text>
          <View>
            <TouchableOpacity
              onPress={onPressSale}
              style={{
                height: 80,
                borderRadius: 12,
                backgroundColor: secondaryColor,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1255/1255986.png",
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    color: textBlack,
                    fontFamily: "Gilroy-Bold",
                  }}
                >
                  Venta Simple
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    color: textBlue,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Registrar venta sin productos
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressProduct}
              style={{
                height: 80,
                borderRadius: 12,
                backgroundColor: secondaryColor,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/685/685388.png",
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    color: textBlack,
                    fontFamily: "Gilroy-Bold",
                  }}
                >
                  Venta de Productos
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    color: textBlue,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Registrar venta productos
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default IncomeTypeModal;
