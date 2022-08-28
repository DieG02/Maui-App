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
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import Button from "../../components/common/Button";

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
          tabBarPressColor: "white",
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
      <View
        style={{
          backgroundColor: "white",
          height: 64,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={() => navigation.navigate("NewIncome")}
            text="Nueva Venta"
            style={{
              backgroundColor: "#33E69B",
              width: (width - 60) / 2,
            }}
          />
          <Button
            onPress={() => navigation.navigate("NewExpense")}
            text="Nueva Gasto"
            style={{
              backgroundColor: "#FD6363",
              width: (width - 60) / 2,
            }}
          />
        </View>
      </View>
    </NavigationContainer>
  );
}
