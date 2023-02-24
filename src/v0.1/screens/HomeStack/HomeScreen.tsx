import React, { useState } from "react";
import { StatusBar, ScrollView, RefreshControl } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Spacer from "../../components/common/Spacer";
import customStyles from "../../styles/customStyles";
import ScreenContainer from "../../components/containers/ScreenContainer";
import ProfileComponent from "../../components/Library/ProfileComponent";
import Title from "../../components/Library/Title";
import GeneralBalance from "../../components/Library/GeneralBalance";
import StateBalance from "../../components/Library/StateBalance";
import TransactionsContainer from "../../components/Library/TransactionsContainer";
import useGetTransactions from "../../services/Transactions/useGetAllTransactions";
import useGetBalance from "../../services/Balance/useGetBalance";
import useGetMonthlyStats from "../../services/Balance/useGetStats";
import useGetAccount from "../../services/Account/useGetAccount";

const { mainColor, white } = customStyles;
const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const { data: transactions, refetch: getTransactionsFromHome } =
    useGetTransactions({ take: 6 });

  const { data: balance, refetch: getBalance } = useGetBalance();
  const { data: stateBalance, refetch: getMonthlyStats } = useGetMonthlyStats();
  const { data: user } = useGetAccount();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getTransactionsFromHome();
    getBalance();
    getMonthlyStats();
    setRefreshing(false);
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor={white} />
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
          user={user}
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
          enable={transactions?.length !== 0}
          onPress={() => navigation.navigate("balance")}
        />
        <Spacer height={10} />
        <TransactionsContainer data={transactions} navigation={navigation} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
