import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import balanceFilled from '../assets/balance-filled.png';
import balance from '../assets/balance.png';
import homeFilled from '../assets/home-filled.png';
import home from '../assets/home.png';
import transactionFilled from '../assets/transaction-filled.png';
import transaction from '../assets/transaction.png';
import TransactionsScreen from '../screens/BalanceStack/TransactionsScreen';
import HomeScreen from '../screens/HomeStack/HomeScreen';
import MonthlySummariesScreen from '../screens/HomeStack/MonthlySummariesScreen';
import { MainBottomTabParamList } from '../screens/types';
import customStyles from '../styles/customStyles';

const { textBlack } = customStyles;

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const HomeTabs = () => {
  const { t } = useTranslation();

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
          name='transactions'
          component={TransactionsScreen}
          options={{
            tabBarLabel: t('transactions'),
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarIcon: ({ color, focused }) => (
              <>
                {focused ? (
                  <Image
                    source={transactionFilled}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: color,
                      marginTop: 4,
                    }}
                  />
                ) : (
                  <Image
                    source={transaction}
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
          name='balance'
          component={MonthlySummariesScreen}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
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
        {/* <Tab.Screen
          name='debts'
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
        /> */}
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeTabs;
