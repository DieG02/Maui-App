import { StatusBar, View, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getTransactions } from "../services/transactions";
import TransactionModal from "../components/common/TransactionsModal";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";

interface Props {
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = "dark-content";
const { width } = Dimensions.get("window");
const TransactionsScreen = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const { data, refetch: getAlltransactions } = useQuery(
    "transactionsBalance",
    () => getTransactions()
  );

  const filterData = () => {
    const filtered = data?.filter((item) =>
      item.name?.toLowerCase().startsWith(text.toLowerCase())
    );
    return filtered;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      {!isSearch ? (
        <Header name="Balance">
          <Icon onPress={() => setIsSearch(true)}>
            <Search name="search" size={25} color="#302F3C" />
          </Icon>
        </Header>
      ) : (
        <SearchBar
          onChangeText={onChangeText}
          text={text}
          placeholder="Buscar ..."
          onPress={() => {
            onChangeText("");
            setIsSearch(false);
          }}
          onBlur={() => text.length === 0 && setIsSearch(false)}
        />
      )}
      <FlatList
        overScrollMode="never"
        data={filterData()}
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
        ListEmptyComponent={() =>
          text.length !== 0 ? (
            <EmptyState title="No se encontraron coincidencias" />
          ) : (
            <EmptyState title="No tenes transacciones registradas" />
          )
        }
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
