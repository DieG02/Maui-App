import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import {income, expense} from "../../services/debts";
interface Props {
  navigation: NavigationProp<any, any>;
}

const { mainColor, background } = globalStyles;

const Tab = createMaterialTopTabNavigator();

const nada = () =>{}

const IncomeDebt = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <View
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        <DebtContactCard data={income} type="client" onPress={nada}/>
      </View>
    </View>
  );
};
const ExpenseDebt = () => {
  return (
<View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <View
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        <DebtContactCard data={expense} type="provider" onPress={nada}/>
      </View>
    </View>
  );
};

const Debts = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <BackHeaderTitle label="Deudas" onPressBack={() => navigation.goBack()} />
      <Tab.Navigator
        style={{ backgroundColor: "#fff" }}
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            marginHorizontal: 20,
            backgroundColor: "white",
          },
          tabBarPressColor: "white",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: mainColor,
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: mainColor,
            height: 50,
            borderRadius: 15,
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: 50,
          },
        }}
      >
        <Tab.Screen name="Por Cobrar" component={IncomeDebt} />
        <Tab.Screen name="Por Pagar" component={ExpenseDebt} />
      </Tab.Navigator>
    </ScreenContainer>
  );
};

export default Debts;
