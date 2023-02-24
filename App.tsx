import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider } from "react-query";
import AuthProvider from "./src/v0.1/context/AuthContext";
import GeneralProvider from "./src/v0.1/context/GeneralContext";
import HomeTabs from "./src/v0.1/navigation/HomeTabs";

// MORE STACK
import DebtsModal from "./src/v0.1/components/common/Modals/DebtsModal";
import UserDataScreen from "./src/v0.1/screens/MoreStack/UserData";
import MoreScreen from "./src/v0.1/screens/MoreStack/MoreScreen";

// AUTH STACK
import SignInScreen from "./src/v0.1/screens/AuthStack/SignInScreen";
import SplashScreen from "./src/v0.1/screens/AuthStack/SplashScreen";
import SignUpScreen from "./src/v0.1/screens/AuthStack/SignUpScreen";

// BALANCE STACK
import NewIncome from "./src/v0.1/screens/BalanceStack/NewIncome";
import NewExpense from "./src/v0.1/screens/BalanceStack/NewExpense";
import EditExpense from "./src/v0.1/screens/BalanceStack/EditExpense";
import TransactionDetail from "./src/v0.1/screens/BalanceStack/TransactionDetail";

// CONTACT STACK
import ClientsScreen from "./src/v0.1/screens/ContactStack/Clients";
import ContactDetail from "./src/v0.1/screens/ContactStack/ContactDetail";
import ProvidersScreen from "./src/v0.1/screens/ContactStack/Providers";
import NewContact from "./src/v0.1/screens/ContactStack/NewContact";

// DEBT STACK
import DebtsScreen from "./src/v0.1/screens/DebtStack/Debts";
import DebtorScreen from "./src/v0.1/screens/DebtStack/DebtorProfile";
import { queryClient } from "./src/v0.1/utils/queryClient";

// v0.2

// import AddItems from "./src/v0.2/BalanceStack/AddItems";
// import ProductDetail from "./src/v0.2/InventoryStack/ProductDetail";
// import Budget from "./src/v0.2/HomeStack/Budget";
// import NotificationsScreen from "./src/v0.2/HomeStack/NotificationsScreen";
// import UserBussinessScreen from "./src/v0.2/MoreStack/UserBussiness";
// import NewProduct from "./src/v0.2/InventoryStack/NewProduct";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GeneralProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Login" component={SignInScreen} />
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="NewIncome" component={NewIncome} />
              <Stack.Screen name="NewExpense" component={NewExpense} />
              <Stack.Screen name="EditExpense" component={EditExpense}/>
              <Stack.Screen name="DebtsModal" component={DebtsModal} />
              <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetail}
              />
              <Stack.Screen name="More" component={MoreScreen} />
              <Stack.Screen name="UserData" component={UserDataScreen} />
              <Stack.Screen name="Clients" component={ClientsScreen} />
              <Stack.Screen name="Providers" component={ProvidersScreen} />
              <Stack.Screen name="ContactDetail" component={ContactDetail} />
              <Stack.Screen name="NewContact" component={NewContact} />
              <Stack.Screen name="Debts" component={DebtsScreen} />
              <Stack.Screen name="DebtorScreen" component={DebtorScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
