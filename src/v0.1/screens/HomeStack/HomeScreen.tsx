import React, { useState } from "react";
import { StatusBar, ScrollView, RefreshControl } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Spacer from "../../components/common/Spacer";
import customStyles from "../../styles/customStyles";
import { useQuery, useQueryClient } from "react-query";
import { getTransactions } from "../../services/transactions";
import { getBalance, getMonthlyMainStats } from "../../services/balance";
import ScreenContainer from "../../components/containers/ScreenContainer";
import LoadingComponent from "../../components/Library/LoadingComponent";
import ProfileComponent from "../../components/Library/ProfileComponent";
import Title from "../../components/Library/Title";
import GeneralBalance from "../../components/Library/GeneralBalance";
import StateBalance from "../../components/Library/StateBalance";
import TransactionsContainer from "../../components/Library/TransactionsContainer";
const { mainColor } = customStyles;
const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const { data, refetch: getTransactionsFromHome } = useQuery(
    "transactions",
    () => getTransactions({ take: 6 })
  );
  const { data: balance } = useQuery("balance", getBalance);
  const { data: stateBalance } = useQuery(
    "getMonthlyStats",
    getMonthlyMainStats
  );
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
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[mainColor]}
          />
        }
      >
        <ProfileComponent
          userName="Billy"
          userLastName="Batista"
          onPressUser={() => navigation.navigate("More")}
        />
        <Spacer height={10} />
        <GeneralBalance data={balance} />
        <Spacer height={20} />
        <Title title="Resumen Mensual" />
        <Spacer height={20} />
        <StateBalance data={stateBalance} />
        <Spacer height={20} />
        <Title
          title="Últimos registros"
          label="Ver más"
          enable={data?.length !== 0}
          onPress={() => navigation.navigate("balance")}
        />
        <Spacer height={10} />
        <TransactionsContainer data={data} navigation={navigation} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
