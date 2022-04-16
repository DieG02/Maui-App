import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import logo from "./assets/logo.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./navigation/HomeTabs";
import NewIncome from "./screens/NewIncome";
import NewExpense from "./screens/NewExpense";
import InventoryScreen from "./screens/InventoryScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="NewIncome" component={NewIncome} />
        <Stack.Screen name="NewExpense" component={NewExpense} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
