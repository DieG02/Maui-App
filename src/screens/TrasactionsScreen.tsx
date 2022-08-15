import { StatusBar, Alert, View, Dimensions, FlatList } from "react-native";
import React from "react";
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import {
  //   getDailyTransactions,
  getTransactions,
} from "../services/transactions";
import Fab from "../components/common/Fab";
import { Text } from "react-native-paper";
import TransactionModal from "../components/common/TransactionsModal";
// import TransactionsDropdown from "../components/common/TransactionsDropdown";

interface Props {
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = "dark-content";
const { width, height } = Dimensions.get("window");
const TransactionsScreen = ({ navigation }: Props) => {
  const { data, refetch: getAlltransactions } = useQuery(
    "transactionsBalance",
    () => getTransactions()
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header name="Balance">
        <Icon onPress={() => navigation.navigate("SearchScreen")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => Alert.alert("Search")}>
          <More name="more-vertical" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <FlatList
        overScrollMode="never"
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={() => {
          getAlltransactions();
        }}
        onEndReached={() => {
          getAlltransactions();
        }}
        style={{ marginHorizontal: 20 }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TransactionModal data={item} key={item.id} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              height: height - 200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#A5A5A5",
                fontFamily: "Gilroy-SemiBold",
              }}
            >
              No tenes transacciones registradas
            </Text>
          </View>
        )}
      />
      <View
        style={{
          backgroundColor: "white",
          height: 64,
          width: "100%",
        }}
      >
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
      </View>
    </SafeAreaView>
  );
};

export default TransactionsScreen;
