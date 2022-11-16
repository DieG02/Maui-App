import { StatusBar, View, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getTransactions } from "../services/transactions";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import ScreenContainer from "../components/containers/ScreenContainer";
import { HeaderTitle } from "../components/common/HeaderTitle";
import TransactionCard from "../components/common/TransactionCard/TransactionCard";
import IncomeTypeModal from "../components/common/IncomeTypeModal";

interface Props {
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = "dark-content";
const { width } = Dimensions.get("window");
const TransactionsScreen = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      {!isSearch ? (
        <HeaderTitle
          label="Balance"
          withSearch
          onPressSearch={() => setIsSearch(true)}
        />
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
          <TransactionCard
            data={item}
            key={item.id}
            onPress={() => navigation.navigate("TransactionDetail", { item })}
          />
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
        <IncomeTypeModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          onPressProduct={() => {
            navigation.navigate("AddItems");
            setModalVisible(false);
          }}
          onPressSale={() => {
            navigation.navigate("NewIncome");
            setModalVisible(false);
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={() => setModalVisible(true)}
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
    </ScreenContainer>
  );
};

export default TransactionsScreen;
