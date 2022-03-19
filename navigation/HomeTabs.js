import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "react-native-vector-icons/Foundation";
import BalanceIcon from "react-native-vector-icons/MaterialIcons";
import InventoryIcon from "react-native-vector-icons/MaterialIcons";
import MoreIcon from "react-native-vector-icons/Entypo";
import HomeScreen from "../screens/HomeScreen";
import BalanceScreen from "../screens/BalanceScreen";
import InventoryScreen from "../screens/InventoryScreen";
import MoreScreen from "../screens/MoreScreen";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: "#3784F9",
        tabBarActiveTintColor: "#387CFF",
        tabBarInactiveTintColor: "#D7DCE4",
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
      {/* <Tab.Screen
        name="more"
        component={MoreScreen}
        options={{
          tabBarIconStyle: {borderRadius: 20},
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MoreIcon name="grid" color={color} size={30} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default HomeTabs;
