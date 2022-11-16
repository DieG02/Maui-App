import React, { useState } from "react";
import {
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import GeneralBalance from "../../components/HomeScreen/GeneralBalance";
import Spacer from "../../components/common/Spacer";
import Title from "../../components/common/Title";
import HomeState from "../../components/HomeScreen/HomeState";
import TransactionsContainer from "../../components/containers/TransactionsContainer";
import globalStyles from "../../styles/globalStyles";
import { useQuery, useQueryClient } from "react-query";
import { getTransactions } from "../../services/transactions";
import { getBalance, getMonthlyMainStats } from "../../services/balance";
import ScreenContainer from "../../components/containers/ScreenContainer";

const { mainColor, textBlack } = globalStyles;
const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const { data, refetch: getTransactionsFromHome } = useQuery(
    "transactions",
    () => getTransactions({ take: 6 })
  );
  useQuery("balance", getBalance);
  useQuery("getMonthlyStats", getMonthlyMainStats);
  useQuery("transactionsBalance", () => getTransactions());

  const queryClient = useQueryClient();
  const isFetchingBalance = queryClient.getQueryState("balance")?.data;

  const isFetchingTransactions =
    queryClient.getQueryState("transactions")?.data;

  const isFetchingGetMonthlyState =
    queryClient.getQueryState("getMonthlyStats")?.data;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getTransactionsFromHome();
    setRefreshing(false);
  };

  if (
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
        <ActivityIndicator size="large" color={textBlack} />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />

      <ScrollView
        overScrollMode="never"
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
          avatar="JR"
          welcome="Hola Juan"
          onPressNotifications={() => navigation.navigate("Notifications")}
          onPressUser={() => navigation.navigate("More")}
        />
        <Spacer height={10} />
        <GeneralBalance />
        <Spacer height={20} />
        <Title title="Resumen Mensual" />
        <Spacer height={20} />
        <HomeState />
        <Spacer height={20} />
        <Title title="Últimos registros">
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
        <TransactionsContainer data={data} navigation={navigation} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
