import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import BalanceScreen from "../screens/BalanceScreen/BalanceScreen";
import InventoryScreen from "../screens/InventoryScreen/InventoryScreen";
import HomeIcon from "react-native-vector-icons/Feather";
import BalanceIcon from "react-native-vector-icons/MaterialIcons";
import InventoryIcon from "react-native-vector-icons/Entypo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainBottomTabParamList } from "../screens/types";
import globalStyles from "../styles/globalStyles";

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const { secondaryColor } = globalStyles;

const HomeTabs = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#387CFF",
          tabBarInactiveTintColor: "#b5b5b5",
          // tabBarInactiveTintColor: secondaryColor,
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
              fontWeight: "500",
            },
            tabBarIconStyle: { borderRadius: 20 },
            tabBarIcon: ({ color, size }) => (
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
            // tabBarIconStyle: { borderRadius: 20 },
            tabBarLabel: "Balance",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: 4,
              fontWeight: "500",
            },
            tabBarIcon: ({ color, size }) => (
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
            tabBarLabel: "More",
            tabBarLabelStyle: {
              fontSize: 14,
              marginBottom: 4,
              fontWeight: "500",
            },
            tabBarIcon: ({ color, size }) => (
              <InventoryIcon
                name="menu"
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
