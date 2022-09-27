import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import globalStyles from "../../../styles/globalStyles";
import { paymentsMethod } from "../../../utils/translate";
import { getTransactionsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";

const { background, secondaryColor, textBlack, textLight, positive } =
  globalStyles;

const styles = StyleSheet.create({
  root: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: background,
  },
});

interface Props {
  onPress: () => void;
  data: getTransactionsResponseDto[0];
}

const TransactionComponent = ({ onPress, data }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
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
              backgroundColor: secondaryColor,
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
                color: textBlack,
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Regular",
                color: textLight,
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
          {data.category?.name === "Venta" ? (
            <Text
              style={{
                fontSize: 18,
                color: positive,
                fontFamily: "Gilroy-SemiBold",
              }}
            >
              ${data?.value}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color: textBlack,
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
              color: textLight,
            }}
          >
            {data.paymentMethod && paymentsMethod[data.paymentMethod].es}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionComponent;
