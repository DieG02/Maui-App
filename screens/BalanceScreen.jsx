import * as React from "react";
import { StatusBar, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Search from "react-native-vector-icons/Feather";
import Filter from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import TabDay from "../components/TabDay";
import TabWeek from "../components/TabWeek";
import TabMonth from "../components/TabMonth";
import TabYear from "../components/TabYear";
import BlockButton from "../components/BlockButton";
import Fab from "../components/Fab";

const statusBarStyle = "dark-content";
const Tab = createMaterialTopTabNavigator();

const { width } = Dimensions.get("window");

export default function BalanceScreen({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header name="Balance">
        <Icon onPress={() => alert("Search")}>
          <Search name="search" size={25} color="#60708F" />
        </Icon>
        <Icon onPress={() => alert("Search")}>
          <More name="more-vertical" size={25} color="#60708F" />
        </Icon>
      </Header>

      <Tab.Navigator
        style={{ backgroundColor: "#fff" }}
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            marginHorizontal: 20,
            backgroundColor: "white",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#3784F9",
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: "#3784F9",
            height: 60,
            borderRadius: 15,
          },
          tabBarItemStyle: {
            marginHorizontal: 1,
            borderRadius: 15,
            height: 60,
          },
        }}
      >
        <Tab.Screen name="Dia" component={TabDay} />
        <Tab.Screen name="Semana" component={TabWeek} />
        <Tab.Screen name="Mes" component={TabMonth} />
        <Tab.Screen name="Año" component={TabYear} />
      </Tab.Navigator>
      {/* <BlockButton /> */}

      <Fab
        right={0}
        bottom={0}
        width={(width - 60) / 2}
        color="#FD6363"
        text="Egreso"
        marginRight={20}
        onPress={() => navigation.navigate("OutcomeForm")}
      />
      <Fab
        left={0}
        bottom={0}
        width={(width - 60) / 2}
        color="#33E69B"
        text="Ingreso"
        marginLeft={20}
        onPress={() => navigation.navigate("IncomeForm2")}
      />
    </NavigationContainer>
  );
}
