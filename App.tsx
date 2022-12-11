import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeTabs from "./src/v0.1/navigation/HomeTabs";
import NewIncome from "./src/v0.1/screens/BalanceStack/NewIncome";
import NewExpense from "./src/v0.1/screens/BalanceStack/NewExpense";
import DebtsModal from "./src/v0.1/components/common/Modals/DebtsModal";
import Budget from "./src/v0.2/HomeStack/Budget";
import NotificationsScreen from "./src/v0.2/HomeStack/NotificationsScreen";
import MoreScreen from "./src/v0.1/screens/MoreStack/MoreScreen";
import UserDataScreen from "./src/v0.1/screens/MoreStack/UserData";
import UserBussinessScreen from "./src/v0.2/MoreStack/UserBussiness";
import ClientsScreen from "./src/v0.1/screens/ContactStack/Clients";
import NewProduct from "./src/v0.2/InventoryStack/NewProduct";
import LoginScreen from "./src/v0.1/screens/AuthStack/LogInScreen";
import SplashScreen from "./src/v0.1/screens/AuthStack/SplashScreen";
import AuthProvider from "./src/v0.1/context/AuthContext";
import SignUpScreen from "./src/v0.1/screens/AuthStack/SignUpScreen";
import ProvidersScreen from "./src/v0.1/screens/ContactStack/Providers";
import NewContact from "./src/v0.1/screens/ContactStack/NewContact";
import GeneralProvider from "./src/v0.1/context/GeneralContext";
import DebtsScreen from "./src/v0.1/screens/MoreStack/Debts";
import AddItems from "./src/v0.2/BalanceStack/AddItems";
import ContactDetail from "./src/v0.1/screens/ContactStack/ContactDetail";
import ProductDetail from "./src/v0.2/InventoryStack/ProductDetail";
import TransactionDetail from "./src/v0.1/screens/BalanceStack/TransactionDetail";

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
              <Stack.Screen name="DebtsModal" component={DebtsModal} />
              <Stack.Screen name="AddItems" component={AddItems} />
              <Stack.Screen name="Budget" component={Budget} />
              <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetail}
              />
              <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
              />
              <Stack.Screen name="More" component={MoreScreen} />
              <Stack.Screen name="UserData" component={UserDataScreen} />
              <Stack.Screen
                name="UserBussiness"
                component={UserBussinessScreen}
              />
              <Stack.Screen name="Clients" component={ClientsScreen} />
              <Stack.Screen name="Providers" component={ProvidersScreen} />
              <Stack.Screen name="ContactDetail" component={ContactDetail} />
              <Stack.Screen name="NewContact" component={NewContact} />
              <Stack.Screen name="Debts" component={DebtsScreen} />
              <Stack.Screen name="NewProduct" component={NewProduct} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
