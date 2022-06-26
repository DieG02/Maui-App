import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./navigation/HomeTabs";
import NewIncome from "./screens/BalanceScreen/NewIncome";
import NewExpense from "./screens/BalanceScreen/NewExpense";
import InventoryScreen from "./screens/InventoryScreen/InventoryScreen";
import CategoryScreen from "./screens/InventoryScreen/CategoryScreen";
import Budget from "./screens/HomeScreen/Budget";
import NotificationsScreen from "./screens/HomeScreen/NotificationsScreen";
import MoreScreen from "./screens/MoreScreen/MoreScreen";
import ContactsScreen from "./screens/MoreScreen/ContactsScreen";
import NewProduct from "./screens/InventoryScreen/NewProduct";
import SearchScreen from "./screens/SearchScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginScreen from "./screens/LogInScreen";
import SplashScreen from "./screens/SplashScreen";
import AuthProvider from "./context/AuthContext";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="NewIncome" component={NewIncome} />
            <Stack.Screen name="NewExpense" component={NewExpense} />
            <Stack.Screen name="Inventory" component={InventoryScreen} />
            <Stack.Screen name="Budget" component={Budget} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="More" component={MoreScreen} />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="NewProduct" component={NewProduct} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
