import React, { useState } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useQuery } from "react-query";
import { getBalance } from "../../services/balance";
import globalStyles from "../../styles/globalStyles";

const { secondaryColor } = globalStyles;

const { width } = Dimensions.get("window");

const HomeBalance = () => {
  const { data: balance } = useQuery("balance", getBalance);

  const [hide, setHide] = useState(false);

  return (
    <View
      style={{
        marginHorizontal: 30,
        backgroundColor: "#F9FAFB",
        width: width - 60,
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
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
              color: secondaryColor,
              fontFamily: "Gilroy-Regular",
            }}
          >
            Saldo General
          </Text>
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {hide ? (
              <Icon name="eye-off" size={30} color="#747070" />
            ) : (
              <Icon name="eye" size={30} color="#747070" />
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
                color: "#161B25",
                fontFamily: "Gilroy-SemiBold",
              }}
            >
              $****
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 30,
                color: "#161B25",
                fontFamily: "Gilroy-SemiBold",
              }}
            >
              $
              {balance?.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeBalance;
