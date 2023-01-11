import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeStack/HomeScreen";
// import BalanceScreen from "../screens/BalanceScreen/BalanceScreen";
import TransactionsScreen from "../screens/BalanceStack/TrasactionsScreen";
import HomeIcon from "react-native-vector-icons/Entypo";
import BalanceIcon from "react-native-vector-icons/MaterialIcons";
import InventoryIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainBottomTabParamList } from "../screens/types";
import customStyles from "../styles/customStyles";
import { Platform } from "react-native";
import Debts from "../screens/DebtStack/Debts";

const { mainColor, disabled } = customStyles;

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const HomeTabs = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: disabled,
          tabBarStyle: {
            height: Platform.OS === "ios" ? 90 : 60,
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Inicio",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === "ios" ? 0 : 4,
            },
            tabBarIconStyle: { borderRadius: 20 },
            tabBarIcon: ({ color }) => (
              <HomeIcon
                name="home"
                color={color}
                size={25}
                style={{ marginTop: 4 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="balance"
          component={TransactionsScreen}
          options={{
            tabBarLabel: "Balance",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === "ios" ? 0 : 4,
            },
            tabBarIcon: ({ color }) => (
              <BalanceIcon
                name="account-balance-wallet"
                color={color}
                size={25}
                style={{ marginTop: 4 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="inventory"
          component={Debts}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
            tabBarLabel: "Deudas",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: Platform.OS === "ios" ? 0 : 4,
            },
            tabBarIcon: ({ color }) => (
              <InventoryIcon
                name="sale"
                color={color}
                size={30}
                style={{ marginTop: 4 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeTabs;
