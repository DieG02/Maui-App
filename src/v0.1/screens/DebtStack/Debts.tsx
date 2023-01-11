import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import customStyles from "../../styles/customStyles";
import IncomeDebt from "./Income";
import ExpenseDebt from "./Expense";

const { mainColor } = customStyles;

const Tab = createMaterialTopTabNavigator();

interface Props {
  navigation: any
}

const Debts = ({
  navigation
}: Props) => {

  console.log(navigation);
  return (
    <ScreenContainer>
      <BackHeaderTitle label="Deudas" onPressBack={navigation.goBack}/>
      <Tab.Navigator
        style={{ backgroundColor: "#fff" }}
        initialRouteName="Por Cobrar"
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
