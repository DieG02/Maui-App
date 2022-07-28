import React, { useState } from "react";
import {
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import HomeBalance from "../../components/HomeScreen/HomeBalance";
import Spacer from "../../components/common/Spacer";
import Title from "../../components/common/Title";
import HomeState from "../../components/HomeScreen/HomeState";
import TransactionsContainer from "../../components/containers/TransactionsContainer";
import globalStyles from "../../styles/globalStyles";
import { useQuery, useQueryClient } from "react-query";
import {
  getDailyTransactions,
  getTransactions,
} from "../../services/transactions";
import { getBalance, getMonthlyMainStats } from "../../services/balance";
import { getItemCategories } from "../../services/itemCategories";
import { getAllProducts } from "../../services/products";

const { mainColor } = globalStyles;
const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const { data, refetch: getTransactionsFromHome } = useQuery(
    "transactions",
    () => getTransactions({ take: 4 })
  );
  useQuery("balance", getBalance);
  useQuery("getMonthlyStats", getMonthlyMainStats);
  useQuery("daylyTransactions", getDailyTransactions);
  useQuery("itemCategories", getItemCategories);
  useQuery("transactionsBalance", () => getTransactions());
  useQuery("products", getAllProducts);

  const queryClient = useQueryClient();
  const isFetchingBalance = queryClient.getQueryState("balance")?.data;

  const isFetchingTransactions =
    queryClient.getQueryState("transactions")?.data;

  const isFetchingProducts = queryClient.getQueryState("products")?.data;

  const isFetchingGetMonthlyState =
    queryClient.getQueryState("getMonthlyStats")?.data;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getTransactionsFromHome();
    setRefreshing(false);
  };

  if (
    !isFetchingProducts ||
    !isFetchingTransactions ||
    !isFetchingGetMonthlyState ||
    isFetchingBalance === undefined
  ) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#141414" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[mainColor]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          onPressNotifications={() => navigation.navigate("Notifications")}
          onPressUser={() => navigation.navigate("More")}
        />
        <Spacer height={20} />
        <HomeBalance />
        <Spacer height={20} />
        <Title title="Resumen Mensual" />
        <Spacer height={10} />
        <HomeState />
        <Spacer height={20} />
        <Title title="Ultimos registros">
          {data?.length !== 0 && (
            <TouchableOpacity onPress={() => navigation.navigate("balance")}>
              <Text
                style={{
                  color: mainColor,
                  fontFamily: "Gilroy-Bold",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                Ver más
              </Text>
            </TouchableOpacity>
          )}
        </Title>
        <Spacer height={10} />
        <TransactionsContainer data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
