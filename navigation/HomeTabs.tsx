import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import BalanceScreen from "../screens/BalanceScreen/BalanceScreen";
import InventoryScreen from "../screens/InventoryScreen/InventoryScreen";
import HomeIcon from "react-native-vector-icons/Entypo";
import BalanceIcon from "react-native-vector-icons/MaterialIcons";
import InventoryIcon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainBottomTabParamList } from "../screens/types";

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const HomeTabs = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#3784F9",
          tabBarInactiveTintColor: "#7888a8",
          tabBarStyle: {
            height: 60,
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
              marginBottom: 4,
            },
            tabBarIconStyle: { borderRadius: 20 },
            tabBarIcon: ({ color }) => (
              <HomeIcon
                name="home"
                color={color}
                size={25}
                style={{ marginTop: 10 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="balance"
          component={BalanceScreen}
          options={{
            tabBarLabel: "Balance",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: 4,
            },
            tabBarIcon: ({ color }) => (
              <BalanceIcon
                name="account-balance-wallet"
                color={color}
                size={25}
                style={{ marginTop: 10 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="inventory"
          component={InventoryScreen}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
            tabBarLabel: "Inventario",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: 4,
            },
            tabBarIcon: ({ color }) => (
              <InventoryIcon
                name="inventory"
                color={color}
                size={30}
                style={{ marginTop: 10 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeTabs;
