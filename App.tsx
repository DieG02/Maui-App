import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeTabs from "./src/navigation/HomeTabs";
import NewIncome from "./src/screens/BalanceScreen/NewIncome";
import NewExpense from "./src/screens/BalanceScreen/NewExpense";
import Budget from "./src/screens/HomeScreen/Budget";
import NotificationsScreen from "./src/screens/HomeScreen/NotificationsScreen";
import MoreScreen from "./src/screens/MoreScreen/MoreScreen";
import ClientsScreen from "./src/screens/MoreScreen/Clients";
import NewProduct from "./src/screens/InventoryScreen/NewProduct";
import LoginScreen from "./src/screens/LogInScreen";
import SplashScreen from "./src/screens/SplashScreen";
import AuthProvider from "./src/context/AuthContext";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProvidersScreen from "./src/screens/MoreScreen/Providers";
import NewContact from "./src/screens/MoreScreen/NewContact";
import GeneralProvider from "./src/context/GeneralContext";
import DebtsScreen from "./src/screens/MoreScreen/Debts";
import AddItems from "./src/screens/BalanceScreen/AddItems";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GeneralProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="NewIncome" component={NewIncome} />
              <Stack.Screen name="NewExpense" component={NewExpense} />
              <Stack.Screen name="AddItems" component={AddItems} />
              <Stack.Screen name="Budget" component={Budget} />
              <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
              />
              <Stack.Screen name="More" component={MoreScreen} />
              <Stack.Screen name="Clients" component={ClientsScreen} />
              <Stack.Screen name="NewContact" component={NewContact} />
              <Stack.Screen name="Providers" component={ProvidersScreen} />
              <Stack.Screen name="Debts" component={DebtsScreen} />
              <Stack.Screen name="NewProduct" component={NewProduct} />
            </Stack.Navigator>
          </NavigationContainer>
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
