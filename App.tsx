import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./src/navigation/HomeTabs";
import NewIncome from "./src/screens/BalanceScreen/NewIncome";
import NewExpense from "./src/screens/BalanceScreen/NewExpense";
import InventoryScreen from "./src/screens/InventoryScreen/InventoryScreen";
import CategoryScreen from "./src/screens/InventoryScreen/CategoryScreen";
import Budget from "./src/screens/HomeScreen/Budget";
import NotificationsScreen from "./src/screens/HomeScreen/NotificationsScreen";
import MoreScreen from "./src/screens/MoreScreen/MoreScreen";
import ContactsScreen from "./src/screens/MoreScreen/ContactsScreen";
import ClientsScreen from "./src/screens/MoreScreen/Clients";
import NewProduct from "./src/screens/InventoryScreen/NewProduct";
import SearchScreen from "./src/screens/SearchScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginScreen from "./src/screens/LogInScreen";
import SplashScreen from "./src/screens/SplashScreen";
import AuthProvider from "./src/context/AuthContext";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProvidersScreen from "./src/screens/MoreScreen/Providers";
import EmployeesScreen from "./src/screens/MoreScreen/Employees";

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
            <Stack.Screen name="Clients" component={ClientsScreen} />
            <Stack.Screen name="Providers" component={ProvidersScreen} />
            <Stack.Screen name="Employees" component={EmployeesScreen} />
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
