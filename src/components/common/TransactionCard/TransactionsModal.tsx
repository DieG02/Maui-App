import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import globalStyles from "../../../styles/globalStyles";
import { getTransactionsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";

const {
  mainColor,
  textBlack,
  background,
  textOutline,
  secondaryColor,
  secondaryColorBorder,
  itemLight,
} = globalStyles;

interface Props {
  data: getTransactionsResponseDto[0];
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  handleMenuDelete: (category: string, id: string) => void;
}

const TransactionModal = ({
  data,
  isModalVisible,
  setModalVisible,
  handleMenuDelete,
}: Props) => {
  // share image from react native
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hola",
        url: "https://assets.iprofesional.com/assets/jpg/2020/05/497231.jpg",
        title: "React Native",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      swipeDirection={["down"]}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
      <View
        style={{
          backgroundColor: background,
          height: data.category.name !== "Venta" ? 450 : 380,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            alignItems: "center",
            height: 50,
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
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: secondaryColor,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon2 name="pen" size={25} color={textOutline} />
          </TouchableOpacity>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginHorizontal: 30,
              backgroundColor: secondaryColor,
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
              backgroundColor: secondaryColor,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon2 name="trash" size={25} color={textOutline} />
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
              color: textBlack,
              fontWeight: "bold",
            }}
          >
            $ {data.value}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: textBlack,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {data.name}
          </Text>
          <Text style={{ color: textBlack, marginBottom: 10 }}>
            {data.date}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              width: "80%",
              height: 56,
              borderWidth: 1.8,
              borderRadius: 10,
              borderColor: secondaryColorBorder,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 25,
            }}
          >
            <Text style={{ color: textBlack, fontSize: 15 }}>Ver más</Text>
            <Icon name="chevron-right" size={25} color={textBlack} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            style={{
              marginTop: 10,
              width: "80%",
              height: 56,
              borderRadius: 10,
              borderColor: secondaryColorBorder,
              borderWidth: 1.8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 25,
            }}
          >
            <Text style={{ color: textBlack, fontSize: 15 }}>
              Compartir comprobante
            </Text>
            <Icon name="chevron-right" size={25} color={textBlack} />
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
                backgroundColor: itemLight,
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
  );
};

export default TransactionModal;
