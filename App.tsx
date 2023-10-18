import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from 'react-query';
import { getLocales } from 'react-native-localize';
import { getLocaleFromAsyncStorage } from './src/v0.1/utils/getUserInfo';
import i18n from './src/v0.1/services/i18n-config';
import AuthProvider from './src/v0.1/context/AuthContext';
import GeneralProvider from './src/v0.1/context/GeneralContext';
import HomeTabs from './src/v0.1/navigation/HomeTabs';

// MORE STACK
import DebtsModal from './src/v0.1/components/common/Modals/DebtsModal';
import UserDataScreen from './src/v0.1/screens/MoreStack/UserData';
import MoreScreen from './src/v0.1/screens/MoreStack/MoreScreen';

// AUTH STACK
import SignInScreen from './src/v0.1/screens/AuthStack/SignInScreen';
import SplashScreen from './src/v0.1/screens/AuthStack/SplashScreen';
import SignUpScreen from './src/v0.1/screens/AuthStack/SignUpScreen';

// BALANCE STACK
import NewIncome from './src/v0.1/screens/BalanceStack/NewIncome';
import EditIncome from './src/v0.1/screens/BalanceStack/EditIncome';
import NewExpense from './src/v0.1/screens/BalanceStack/NewExpense';
import EditExpense from './src/v0.1/screens/BalanceStack/EditExpense';
import TransactionDetail from './src/v0.1/screens/BalanceStack/TransactionDetail';

// CONTACT STACK
import ClientsScreen from './src/v0.1/screens/ContactStack/Clients';
import ContactDetail from './src/v0.1/screens/ContactStack/ContactDetail';
import ProvidersScreen from './src/v0.1/screens/ContactStack/Providers';
import NewContact from './src/v0.1/screens/ContactStack/NewContact';

// DEBT STACK
import DebtsScreen from './src/v0.1/screens/DebtStack/Debts';
import DebtorScreen from './src/v0.1/screens/DebtStack/DebtorProfile';
import { queryClient } from './src/v0.1/utils/queryClient';
import { StatusBar } from 'react-native';
import DebtDetail from './src/v0.1/screens/DebtStack/DebtDetail';

import customStyles from './src/v0.1/styles/customStyles';
import EditDebt from './src/v0.1/screens/DebtStack/EditDebt';
import IndividualPayment from './src/v0.1/screens/DebtStack/IndividualPayment';

const { white } = customStyles;
const statusBarStyle = 'dark-content';

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultLenguage = getLocales()[0].languageCode;

const App = () => {
  useEffect(() => {
    const loadLanguage = async () => {
      const locale = await getLocaleFromAsyncStorage();
      if (locale) {
        i18n.changeLanguage(locale);
      } else {
        i18n.changeLanguage(defaultLenguage);
      }
    };
    loadLanguage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GeneralProvider>
          <StatusBar barStyle={statusBarStyle} backgroundColor={white} />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'none',
              }}
            >
              <Stack.Screen name='Splash' component={SplashScreen} />
              <Stack.Screen name='SignUp' component={SignUpScreen} />
              <Stack.Screen name='Login' component={SignInScreen} />
              <Stack.Screen name='HomeTabs' component={HomeTabs} />
              <Stack.Screen
                name='NewIncome'
                component={NewIncome}
                options={{
                  animation: 'fade_from_bottom',
                  animationTypeForReplace: 'push',
                }}
              />
              <Stack.Screen name='EditIncome' component={EditIncome} />
              <Stack.Screen
                name='NewExpense'
                component={NewExpense}
                options={{
                  animation: 'fade_from_bottom',
                  animationTypeForReplace: 'push',
                }}
              />
              <Stack.Screen name='EditExpense' component={EditExpense} />
              <Stack.Screen name='DebtsModal' component={DebtsModal} />
              <Stack.Screen
                name='TransactionDetail'
                component={TransactionDetail}
                options={{
                  animation: 'fade_from_bottom',
                  animationTypeForReplace: 'push',
                }}
              />
              <Stack.Screen name='More' component={MoreScreen} />
              <Stack.Screen name='UserData' component={UserDataScreen} />
              <Stack.Screen name='Clients' component={ClientsScreen} />
              <Stack.Screen name='Providers' component={ProvidersScreen} />
              <Stack.Screen name='ContactDetail' component={ContactDetail} />
              <Stack.Screen name='NewContact' component={NewContact} />
              <Stack.Screen name='Debts' component={DebtsScreen} />
              <Stack.Screen name='DebtDetail' component={DebtDetail} />
              <Stack.Screen name='EditDebt' component={EditDebt} />
              <Stack.Screen name='DebtorScreen' component={DebtorScreen} />
              <Stack.Screen name='IndividualPayment' component={IndividualPayment} />
            </Stack.Navigator>
          </NavigationContainer>
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
