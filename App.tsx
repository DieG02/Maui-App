import React from "react";
// import logo from "./assets/logo.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./navigation/HomeTabs";
import NewIncome from "./screens/BalanceScreen/NewIncome";
import NewExpense from "./screens/BalanceScreen/NewExpense";
import InventoryScreen from "./screens/InventoryScreen/InventoryScreen";
import FinancialAccounts from "./screens/HomeScreen/FinancialAccounts";
import NotificationsScreen from "./screens/HomeScreen/NotificationsScreen";
import MoreScreen from "./screens/MoreScreen/MoreScreen";
import ContactsScreen from "./screens/MoreScreen/ContactsScreen";
import NewProduct from "./screens/InventoryScreen/NewProduct";
import SearchScreen from "./screens/SearchScreen";

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
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
