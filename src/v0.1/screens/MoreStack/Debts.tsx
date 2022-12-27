import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import SummaryDebt from "../../components/common/SummaryDebt";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, ScrollView } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { income, expense } from "../../services/debts";

const { mainColor, background } = customStyles;

const Tab = createMaterialTopTabNavigator();

interface Props {
  navigation: any
}

const IncomeDebt = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <ScrollView
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={income} type="client" onPress={() => {}} />
        <DebtContactCard data={expense} type="provider" onPress={() => { }} />
      </ScrollView>
      <SummaryDebt type="income" amount={3500} clients={6} />
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
      <ScrollView
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        
        <DebtContactCard data={expense} type="provider" onPress={() => {}} />
      </ScrollView>
      <SummaryDebt type="expense" amount={5600} clients={4}/>
    </View>
  );
};

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
