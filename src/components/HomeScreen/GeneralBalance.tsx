import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useQuery } from "react-query";
import { getBalance } from "../../services/balance";
import globalStyles from "../../styles/globalStyles";

const { textBlack, balanceCard, balanceCardBorder } = globalStyles;

const GeneralBalance = () => {
  const { data: balance } = useQuery("balance", getBalance);

  const [hide, setHide] = useState(false);

  return (
    <View
      style={{
        marginHorizontal: 30,
        backgroundColor: balanceCard,
        borderColor: balanceCardBorder,
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        paddingHorizontal: 20,
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
        <Text
          style={{
            fontSize: 18,
            color: textBlack,
            fontFamily: "Gilroy-Regular",
          }}
        >
          Saldo General
        </Text>
        <TouchableOpacity onPress={() => setHide(!hide)}>
          {hide ? (
            <Icon name="eye-off" size={30} color={textBlack} />
          ) : (
            <Icon name="eye" size={30} color={textBlack} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {hide ? (
          <Text
            style={{
              fontSize: 30,
              color: textBlack,
              fontFamily: "Gilroy-SemiBold",
            }}
          >
            $****
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 30,
              color: textBlack,
              fontFamily: "Gilroy-SemiBold",
            }}
          >
            {Platform.OS === "ios"
              ? balance?.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })
              : `$${balance?.toLocaleString("es-AR", {
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
