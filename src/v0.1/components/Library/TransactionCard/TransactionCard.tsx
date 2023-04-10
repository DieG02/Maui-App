import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import customStyles from "../../../styles/customStyles";
import { paymentsMethod } from "../../../utils/translate";
import { getTransactionsResponseDto } from "../../../../../../Maui-Backend/src/controllers/types";
import styles from "./style";
import { parseDDMMYY } from "../../../utils/helper";

const { textBlack, positive } = customStyles;

interface Props {
  onPress: () => void;
  data: getTransactionsResponseDto[0];
}

// TODO: Refactor this component to make it more efficient
const TransactionCard = ({ onPress, data }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles().wrapper}>
      <View style={styles().leftContainer}>
        <View style={styles().iconContainer}>
          <Image
            source={{
              uri: data.category?.imageUrl,
            }}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View style={styles("left").textContainer}>
          <Text style={styles("", textBlack).titleCard} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles().textSubtitle}>
            {parseDDMMYY(data.date)}
          </Text>
        </View>
      </View>
      <View style={styles().rightContainer}>
        <View style={styles().textContainer}>
          {data.category?.name === "Venta" ? (
            <Text style={styles("", positive).textTitle} numberOfLines={1}>
              {data?.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </Text>
          ) : (
            <Text style={styles("", textBlack).textTitle} numberOfLines={1}>
              -
              {data?.value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </Text>
          )}
          <Text style={styles().textSubtitle}>
            {data.paymentMethod && paymentsMethod[data.paymentMethod].es}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;
