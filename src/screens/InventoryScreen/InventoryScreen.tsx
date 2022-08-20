import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import ProductCard from "../../components/common/ProductCard";
import Fab from "../../components/common/Fab";
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
import { getAllProducts } from "../../services/products";
import EmptyState from "../../components/common/EmptyState";

const { mainColor } = globalStyles;
const statusBarStyle = "dark-content";
const { width } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

const InventoryScreen = ({ navigation }: Props) => {
  const [modalState, setModalState] = useState(false);
  const [category, setCategory] = useState("");

  const { data: itemCategories, refetch: getCategories } = useQuery(
    "itemCategories",
    getItemCategories
  );

  const {
    data: products,
    refetch: getProducts,
    isLoading,
  } = useQuery("products", getAllProducts);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header name="Inventario">
        <Icon onPress={() => navigation.navigate("SearchScreen")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => Alert.alert("Search")}>
          <More name="more-vertical" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <View>
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
      </View>
      <FlatList
        overScrollMode="never"
        data={products}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => {
          getProducts();
        }}
        onEndReached={() => {
          getProducts();
        }}
        ListEmptyComponent={() => (
          <EmptyState title="No tienes productos en tu inventario" />
        )}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
        style={{
          marginHorizontal: 20,
        }}
      />
      <View
        style={{
          backgroundColor: "white",
          height: 64,
          width: "100%",
        }}
      >
        <Fab
          bottom={0}
          left={0}
          width={width - 40}
          marginLeft={20}
          color={mainColor}
          text="Crear Item"
          onPress={() => navigation.navigate("NewProduct")}
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
    marginLeft: 10,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default InventoryScreen;
