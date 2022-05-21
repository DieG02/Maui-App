import React, { useState } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import globalStyles from "../../styles/globalStyles";

const { mainColor, secondaryColor } = globalStyles;

const { width } = Dimensions.get("window");

interface Props {
  onPress: () => void;
}

const HomeBalance = ({ onPress }: Props) => {
  const [hide, setHide] = useState(false);

  console.log("Hide ==>", hide);
  return (
    <View
      style={{
        marginHorizontal: 30,
        backgroundColor: "#F9FAFB",
        width: width - 60,
        borderRadius: 20,
        height: 180,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: secondaryColor,
              fontFamily: "Gilroy-Regular",
            }}
          >
            Saldo
          </Text>
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {hide ? (
              <Icon name="eye-off" size={30} color="#A8CAFE" />
            ) : (
              <Icon name="eye" size={30} color="#A8CAFE" />
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
                fontSize: 40,
                color: mainColor,
                fontFamily: "Gilroy-Bold",
                marginTop: 15,
                marginBottom: 20,
                marginRight: 15,
              }}
            >
              $****
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 40,
                color: mainColor,
                fontFamily: "Gilroy-Bold",
                marginTop: 15,
                marginBottom: 20,
                marginRight: 15,
              }}
            >
              $4000
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            display: "flex",
            flexDirection: "row",
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
            Ver mis presupuestos
          </Text>
          <Icon name="chevron-right" size={25} color={mainColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeBalance;
