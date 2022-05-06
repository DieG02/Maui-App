import React from "react";
import { StatusBar, Dimensions, Alert, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import TabDay from "../../components/BalanceScreen/TabDay";
import TabWeek from "../../components/BalanceScreen/TabWeek";
import TabMonth from "../../components/BalanceScreen/TabMonth";
import TabYear from "../../components/BalanceScreen/TabYear";
import Fab from "../../components/common/Fab";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";

const { mainColor, secondaryColor } = globalStyles;
const statusBarStyle = "dark-content";
const Tab = createMaterialTopTabNavigator();

const { width } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function BalanceScreen({ navigation }: Props) {
  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <View
        style={{
          backgroundColor: "white",
          height: Platform.select({
            ios: 52,
            android: 0,
          }),
        }}
      />
      <Header name="Balance">
        <Icon onPress={() => navigation.navigate("SearchScreen")}>
          <Search name="search" size={25} color={secondaryColor} />
        </Icon>
        <Icon onPress={() => Alert.alert("Search")}>
          <More name="more-vertical" size={25} color={secondaryColor} />
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
          tabBarInactiveTintColor: mainColor,
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: mainColor,
            height: 50,
            borderRadius: 15,
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: 50,
          },
        }}
      >
        <Tab.Screen name="Dia" component={TabDay} />
        <Tab.Screen name="Semana" component={TabWeek} />
        <Tab.Screen name="Mes" component={TabMonth} />
        <Tab.Screen name="Año" component={TabYear} />
      </Tab.Navigator>
      <Fab
        right={0}
        bottom={0}
        width={(width - 60) / 2}
        color="#FD6363"
        text="Egreso"
        marginRight={20}
        onPress={() => navigation.navigate("NewExpense")}
      />
      <Fab
        left={0}
        bottom={0}
        width={(width - 60) / 2}
        color="#33E69B"
        text="Ingreso"
        marginLeft={20}
        onPress={() => navigation.navigate("NewIncome")}
      />
    </NavigationContainer>
  );
}
