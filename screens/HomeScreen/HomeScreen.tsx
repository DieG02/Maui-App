import React, { useState } from "react";
import {
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

import HomeHeader from "../../components/HomeScreen/HomeHeader";
import HomeBalance from "../../components/HomeScreen/HomeBalance";
import Spacer from "../../components/common/Spacer";
import Title from "../../components/common/Title";
import HomeState from "../../components/HomeScreen/HomeState";
import TransactionsContainer from "../../components/containers/TransactionsContainer";

const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    console.log("refreshing");
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3784F9"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          onPressNotifications={() => navigation.navigate("Notifications")}
          onPressUser={() => navigation.navigate("More")}
        />
        <Spacer height={20} />
        <HomeBalance onPress={() => navigation.navigate("FinancialAccounts")} />
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
        <TransactionsContainer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
