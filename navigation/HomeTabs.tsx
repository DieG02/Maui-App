import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BalanceScreen from "../screens/BalanceScreen";
import InventoryScreen from "../screens/InventoryScreen";
import HomeIcon from "react-native-vector-icons/Foundation";
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
          tabBarActiveTintColor: "#387CFF",
          tabBarInactiveTintColor: "#D7DCE4",
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <HomeIcon name="home" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="balance"
          component={BalanceScreen}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <BalanceIcon
                name="account-balance-wallet"
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="inventory"
          component={InventoryScreen}
          options={{
            tabBarIconStyle: { borderRadius: 20 },
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <InventoryIcon name="inventory" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeTabs;
