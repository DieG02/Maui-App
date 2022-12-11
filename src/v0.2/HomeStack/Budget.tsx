import React from "react";
import { Text, View } from "react-native";
import Bill from "react-native-vector-icons/FontAwesome5";
import Bank from "react-native-vector-icons/FontAwesome";
import { NavigationProp } from "@react-navigation/native";
import customStyles from "../../v0.1/styles/customStyles";
import ScreenContainer from "../../v0.1/components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../v0.1/components/common/HeaderTitle";

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const Budget = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Presupuestos"
        onPressBack={() => navigation.goBack()}
        withSearch
      />
      <View style={{ marginHorizontal: 30, marginTop: 10 }}>
        <View
          style={{
            backgroundColor: "white",
            height: 120,
            marginBottom: 20,
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#E6EFF8",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bill name="money-bill" size={35} color={mainColor} />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 18, color: "#131313" }}>Saldo</Text>
            <Text
              style={{ fontSize: 22, fontWeight: "bold", color: "#131313" }}
            >
              $3000
            </Text>
            <Text style={{ color: "#131313" }}>Caja</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: 120,
            marginBottom: 20,
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#E6EFF8",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bank name="bank" size={35} color={mainColor} />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 18, color: "#131313" }}>Saldo</Text>
            <Text
              style={{ fontSize: 22, fontWeight: "bold", color: "#131313" }}
            >
              $1000
            </Text>
            <Text style={{ color: "#131313" }}>Banco</Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Budget;
