import { StatusBar, View, FlatList } from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getTransactions } from "../../services/transactions";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import ScreenContainer from "../../components/containers/ScreenContainer";
import customStyles from "../../styles/customStyles";

import Header from "../../components/Library/Header";
import SearchBar from "../../components/Library/SearchBar";
import TransactionCard from "../../components/Library/TransactionCard";

// TODO: Refactor this component
interface Props {
  navigation: NavigationProp<any, any>;
}

const { mainColor, textBlack, width, marginHorizontal } = customStyles;

const statusBarStyle = "dark-content";

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
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      {!isSearch ? (
        <>
          <Header
            label="Balance"
            withSearch
            onPressSearch={() => setIsSearch(true)}
          />
        </>
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
        style={{ marginHorizontal: marginHorizontal }}
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
          height: 70,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "space-between",
            height: 70,
            alignItems: "flex-start",
          }}
        >
          <Button
            onPress={() => navigation.navigate("NewIncome")}
            text="Nuevo Ingreso"
            style={{
              backgroundColor: mainColor,
              width: (width - 60) / 2,
            }}
          />
          <Button
            onPress={() => navigation.navigate("NewExpense")}
            text="Nuevo Gasto"
            color={textBlack}
            style={{
              backgroundColor: "#f3f6f8",
              width: (width - 60) / 2,
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default TransactionsScreen;
