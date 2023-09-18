import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeStack/HomeScreen';
import TransactionsScreen from '../screens/BalanceStack/TrasactionsScreen';
import HomeIcon from 'react-native-vector-icons/Entypo';
import BalanceIcon from 'react-native-vector-icons/MaterialIcons';
import InventoryIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainBottomTabParamList } from '../screens/types';
import customStyles from '../styles/customStyles';
import { Platform } from 'react-native';
import Debts from '../screens/DebtStack/Debts';
import LoadingComponent from '../components/Library/LoadingComponent';
import useGetTransactions from '../services/Transactions/useGetAllTransactions';
import useGetMonthlyStats from '../services/Balance/useGetStats';
import useGetBalance from '../services/Balance/useGetBalance';
import useGetAccount from '../services/Account/useGetAccount';
import useGetAllContacts from '../services/Contacts/useGetAllContacts';
import useGetExpenseCategories from '../services/Expenses/useGetExpenseCategories';
import { useTranslation } from 'react-i18next';

const { mainColor, textBlack, mistyBlue } = customStyles;

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const HomeTabs = () => {
  const { t } = useTranslation();

  const isFetchingTransactions = useGetTransactions().isLoading;
  const isFetchingGetMonthlyState = useGetMonthlyStats().isLoading;
  const isFetchingBalance = useGetBalance().isLoading;
  const isFetchingAccount = useGetAccount().isLoading;
  const isFetchingContacts = useGetAllContacts().isLoading;
  const isFetchingGetExpenseCategories = useGetExpenseCategories().isLoading;

  const isLoading =
    isFetchingTransactions ||
    isFetchingGetMonthlyState ||
    isFetchingBalance ||
    isFetchingAccount ||
    isFetchingContacts ||
    isFetchingGetExpenseCategories;
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
          tabBarInactiveTintColor: mistyBlue,
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
            tabBarIcon: ({ color }) => <HomeIcon name='home' color={color} size={25} style={{ marginTop: 4 }} />,
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
            tabBarIcon: ({ color }) => (
              <BalanceIcon name='account-balance-wallet' color={color} size={25} style={{ marginTop: 4 }} />
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
            tabBarIcon: ({ color }) => <InventoryIcon name='sale' color={color} size={30} style={{ marginTop: 4 }} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeTabs;
