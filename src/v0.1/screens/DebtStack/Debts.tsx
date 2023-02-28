import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import customStyles from "../../styles/customStyles";
import IncomeDebt from "./Income";
import ExpenseDebt from "./Expense";
import Header from "../../components/Library/Header";

const { mainColor } = customStyles;

const Tab = createMaterialTopTabNavigator();

const Debts = () => {
  return (
    <ScreenContainer>
      <Header label="Deudas" />
      <Tab.Navigator
        overScrollMode="never"
        style={{ backgroundColor: "#fff" }}
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            marginHorizontal: 20,
            backgroundColor: "#f8f8f8",
            borderRadius: 15,
          },
          tabBarPressColor: "white",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: mainColor,
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: mainColor,
            height: 45,
            borderRadius: 15,
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: 45,
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
