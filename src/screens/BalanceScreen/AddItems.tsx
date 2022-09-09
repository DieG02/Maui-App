import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import ProductCard from "../../components/common/ProductCard";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import Arrow from "react-native-vector-icons/Ionicons";

import { useQuery } from "react-query";
import { getItemCategories } from "../../services/itemCategories";
import CategoriesSlider from "../../components/InventoryScreen/CategoriesSlider";
import EmptyState from "../../components/common/EmptyState";
import { getAllItem } from "../../services/items";
import Button from "../../components/common/Button";

import SearchBar from "../../components/common/SearchBar";

const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const { mainColor, width } = globalStyles;

const AddItems = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  console.log("selectedItems", selectedItems);

  const handleSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const { data: items, isLoading } = useQuery("items", getAllItem);
  const { data: itemCategories } = useQuery(
    "itemCategories",
    getItemCategories
  );

  const filterData = () => {
    const filtered = items?.filter((item) =>
      item.name.toLowerCase().startsWith(text.toLowerCase())
    );
    return filtered;
  };

  if (isLoading) {
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
      {!isSearch ? (
        <Header
          name="Añadir items"
          color="white"
          icon={
            <Icon onPress={() => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color={mainColor} />
            </Icon>
          }
        >
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
      <View>
        {!isSearch && (
          <View style={styles.container}>
            {itemCategories?.length !== 0 && (
              <CategoriesSlider itemCategories={itemCategories} />
            )}
          </View>
        )}
      </View>
      <FlatList
        overScrollMode="never"
        data={filterData()}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleSelect(item.id)}
            isSelected={selectedItems.includes(item.id)}
            isAdd={true}
            disabled
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        ListEmptyComponent={() =>
          text.length !== 0 ? (
            <EmptyState title="No se encontraron coincidencias" />
          ) : (
            <EmptyState title="No tienes productos en tu inventario" />
          )
        }
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
        style={{
          marginHorizontal: 20,
        }}
      />
      <View
        style={{
          width: "100%",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Button
          text={`${selectedItems.length} items `}
          style={{
            backgroundColor: mainColor,
            width: width - 60,
            elevation: 4,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    backgroundColor: mainColor,
    borderRadius: 20,
    justifyContent: "center",
    marginRight: 10,
    height: 40,
  },
  out: {
    backgroundColor: "#E6EFF8",
    borderRadius: 20,
    justifyContent: "center",
    marginRight: 10,
    height: 40,
  },
  text: {
    marginHorizontal: 20,
    fontSize: 18,
    color: "white",
  },
  text1: {
    marginHorizontal: 20,
    fontSize: 18,
    color: mainColor,
    fontWeight: "500",
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AddItems;
