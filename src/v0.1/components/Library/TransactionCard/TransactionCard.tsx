import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import customStyles from "../../../styles/customStyles";
import { paymentsMethod } from "../../../utils/translate";
import { getTransactionsResponseDto } from "../../../../../../Maui-Backend/src/controllers/types";
import styles from "./style";

const { textBlack, positive } = customStyles;

interface Props {
  onPress: () => void;
  data: getTransactionsResponseDto[0];
}

// TODO: Refactor this component to make it more efficient
const TransactionCard = ({ onPress, data }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles().wrapper}>
      <View style={styles().container}>
        <View style={styles().container}>
          <View style={styles().iconContainer}>
            <Image
              source={{
                uri: data.category?.imageUrl,
              }}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={styles("left").textContainer}>
            <Text style={styles("", textBlack).textTitle}>{data.name}</Text>
            <Text style={styles().textSubtitle}>{data.date}</Text>
          </View>
        </View>
        <View style={styles().textContainer}>
          {data.category?.name === "Venta" ? (
            <Text style={styles("", positive).textTitle}>${data?.value}</Text>
          ) : (
            <Text style={styles("", textBlack).textTitle}>-${data?.value}</Text>
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
