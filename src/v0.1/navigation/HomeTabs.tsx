import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeStack/HomeScreen';
import TransactionsScreen from '../screens/BalanceStack/TransactionsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainBottomTabParamList } from '../screens/types';
import customStyles from '../styles/customStyles';
import { Image, Platform } from 'react-native';
import Debts from '../screens/DebtStack/Debts';
import LoadingComponent from '../components/Library/LoadingComponent';
import useGetTransactions from '../services/Transactions/useGetAllTransactions';
import useGetMonthlyStats from '../services/Balance/useGetStats';
import useGetBalance from '../services/Balance/useGetBalance';
import useGetAccount from '../services/Account/useGetAccount';
import useGetAllContacts from '../services/Contacts/useGetAllContacts';
import { useTranslation } from 'react-i18next';
import useGetAllDebts from '../services/Debts/useGetAllDebts';
import home from '../assets/home.png';
import balance from '../assets/balance.png';
import debt from '../assets/debt.png';
import homeFilled from '../assets/home-filled.png';
import balanceFilled from '../assets/balance-filled.png';
import debtFilled from '../assets/debt-filled.png';
import useLocalStorage from '../hooks/useLocalStorage';

const { mainColor, textBlack } = customStyles;

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const HomeTabs = () => {
  const { t, i18n } = useTranslation();
  const { modifyData } = useLocalStorage();

  const { data: user, isLoading: isFetchingAccount } = useGetAccount();
  const isFetchingTransactions = useGetTransactions({ take: 6 }).isLoading;
  const isFetchingGetMonthlyState = useGetMonthlyStats().isLoading;
  const isFetchingBalance = useGetBalance().isLoading;
  const isFetchingContacts = useGetAllContacts().isLoading;
  const isFetchingDebts = useGetAllDebts().isLoading;

  useEffect(() => {
    // Sync user language with LocaleStorage
    if (user?.language) {
      i18n.changeLanguage(user.language);
      modifyData('locale', user.language);
    }
  }, [user]);

  const isLoading =
    isFetchingTransactions ||
    isFetchingGetMonthlyState ||
    isFetchingBalance ||
    isFetchingAccount ||
    isFetchingContacts ||
    isFetchingDebts;
  if (isLoading) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName='home'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: textBlack,
          tabBarInactiveTintColor: textBlack,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 90 : 60,
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name='home'
          component={HomeScreen}
          options={{
            tabBarLabel: t('home'),
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarIconStyle: { borderRadius: 20 },

            tabBarIcon: ({ color, focused }) => (
              <>
                {focused ? (
                  <Image
                    source={homeFilled}
                    style={{
                      width: 28,
                      height: 28,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                ) : (
                  <Image
                    source={home}
                    style={{
                      width: 26,
                      height: 26,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name='balance'
          component={TransactionsScreen}
          options={{
            tabBarLabel: t('balance'),
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarIcon: ({ color, focused }) => (
              <>
                {focused ? (
                  <Image
                    source={balanceFilled}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                ) : (
                  <Image
                    source={balance}
                    style={{
                      width: 28,
                      height: 28,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name='inventory'
          component={Debts}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
            tabBarLabel: t('debts'),
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarIcon: ({ color, focused }) => (
              <>
                {focused ? (
                  <Image
                    source={debtFilled}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                ) : (
                  <Image
                    source={debt}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeTabs;
