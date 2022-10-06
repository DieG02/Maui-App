import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../../components/common/Products/ProductCard";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import InputModal from "../../components/common/InputModal";
import { useMutation, useQuery } from "react-query";
import {
  createNewItemCategory,
  getItemCategories,
} from "../../services/itemCategories";
import { createOneProductCategoryInputDto } from "../../../../Maui-Backend/src/controllers/types";
import CategoriesSlider from "../../components/InventoryScreen/CategoriesSlider";
import EmptyState from "../../components/common/EmptyState";
import { getAllItem } from "../../services/items";
import Button from "../../components/common/Button";

import SearchBar from "../../components/common/SearchBar";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { HeaderTitle } from "../../components/common/HeaderTitle";

const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const { mainColor, width } = globalStyles;

const InventoryScreen = ({ navigation }: Props) => {
  const [modalState, setModalState] = useState(false);
  const [category, setCategory] = useState("");

  const [text, onChangeText] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const { data: items, isLoading } = useQuery("items", getAllItem);
  const { data: itemCategories, refetch: getCategories } = useQuery(
    "itemCategories",
    getItemCategories
  );

  const filterData = () => {
    const filtered = items?.filter((item) =>
      item.name.toLowerCase().startsWith(text.toLowerCase())
    );
    return filtered;
  };

  const form: createOneProductCategoryInputDto = {
    name: category,
  };
  const { mutateAsync } = useMutation(createNewItemCategory, {
    onSuccess() {
      setModalState(false);
      setCategory("");
      getCategories();
    },
  });

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
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      {!isSearch ? (
        <HeaderTitle
          label="Catálogo"
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
      <View>
        {!isSearch && (
          <View style={styles.container}>
            <View style={{ marginRight: 10 }}>
              <InputModal
                isDataEmpty={itemCategories?.length === 0}
                isModalVisible={modalState}
                setIsModalVisible={setModalState}
                setSelectedOption={setCategory}
                selectedOption={category}
                buttonDisabled={category == ""}
                buttonText="Crear Categoría"
                buttonStyle={{ backgroundColor: mainColor, height: 55 }}
                onPress={() => mutateAsync(form)}
              />
            </View>
            {itemCategories?.length !== 0 && (
              <CategoriesSlider itemCategories={itemCategories} />
            )}
          </View>
        )}
      </View>
      <FlatList
        overScrollMode="never"
        data={filterData()}
        renderItem={({ item }) => <ProductCard data={item} />}
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
          onPress={() => navigation.navigate("NewProduct")}
          text="Registrar item"
          style={{
            backgroundColor: mainColor,
            width: width - 60,
            elevation: 4,
          }}
        />
      </View>
    </ScreenContainer>
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

export default InventoryScreen;
