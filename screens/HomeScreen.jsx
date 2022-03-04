import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import LastTransactions from "../components/LastTransactions";
import Title from "../components/Title";
import Spacer from "../components/Spacer";
import HomeHeader from "../components/HomeHeader";
import HomeBalance from "../components/HomeBalance";
import HomeState from "../components/HomeState";
import Modal from "../components/Modal";


const statusBarStyle = "dark-content";

function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    console.log("refreshing");
    setRefreshing(false);
  };

  return (
    <View>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView
        vertical
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3784F9"]}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <HomeHeader
          onPressUser={() => navigation.navigate("MoreScreen")}
          onPressNotifications={() => navigation.navigate("Notifications")}
        />
        <Spacer height={20} />
        <HomeBalance onPress={() => navigation.navigate("Accounts")} />
        <Spacer height={20} />
        <Title title="Resumen Mensual" />
        <Spacer height={20} />
        <HomeState />
        <Spacer height={20} />
        <Title title="Actividad">
          <TouchableOpacity onPress={() => navigation.navigate("balance")}>
            <Text
              style={{ color: "#3784F9", fontWeight: "bold", fontSize: 15 }}
            >
              Ver más
            </Text>
          </TouchableOpacity>
        </Title>
        <Spacer height={20} />
        <LastTransactions navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
