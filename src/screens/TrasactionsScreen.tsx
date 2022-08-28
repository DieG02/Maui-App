import { StatusBar, Alert, View, Dimensions, FlatList } from "react-native";
import React from "react";
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getTransactions } from "../services/transactions";
import TransactionModal from "../components/common/TransactionsModal";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";

interface Props {
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = "dark-content";
const { width } = Dimensions.get("window");
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
          <EmptyState
            title=" No tenes transacciones registradas"
            percentage={0.25}
          />
        )}
      />
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
              elevation: 4,
            }}
          />
          <Button
            onPress={() => navigation.navigate("NewExpense")}
            text="Nueva Gasto"
            style={{
              backgroundColor: "#FD6363",
              width: (width - 60) / 2,
              elevation: 4,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionsScreen;
