import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import customStyles from "../../../styles/customStyles";
import styles from "./style";

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  data: number | undefined;
}

const GeneralBalance = ({ data }: Props) => {
  const [hide, setHide] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Saldo General</Text>
        <TouchableOpacity onPress={() => setHide(!hide)}>
          {hide ? (
            <Icon name="eye-off" size={30} color={textBlack} />
          ) : (
            <Icon name="eye" size={30} color={textBlack} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {hide ? (
          <Text style={styles.textPrice}>$****</Text>
        ) : (
          <Text style={styles.textPrice}>
            {Platform.OS === "ios"
              ? data?.toLocaleString("es", {
                  style: "currency",
                  currency: "ARS",
                })
              : `$${data?.toLocaleString("es", {
                  style: "currency",
                  currency: "ARS",
                })}`}
          </Text>
        )}
      </View>
    </View>
  );
};

export default GeneralBalance;
