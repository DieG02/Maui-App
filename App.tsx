import React from "react";
// import logo from "./assets/logo.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./navigation/HomeTabs";
import NewIncome from "./screens/NewIncome";
import NewExpense from "./screens/NewExpense";
import InventoryScreen from "./screens/InventoryScreen";
import FinancialAccounts from "./screens/FinancialAccounts";
import NotificationsScreen from "./screens/NotificationsScreen";
import MoreScreen from "./screens/MoreScreen";
import ContactsScreen from "./screens/ContactsScreen";
import NewProduct from "./screens/NewProduct";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="NewIncome" component={NewIncome} />
        <Stack.Screen name="NewExpense" component={NewExpense} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="FinancialAccounts" component={FinancialAccounts} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="More" component={MoreScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="NewProduct" component={NewProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
