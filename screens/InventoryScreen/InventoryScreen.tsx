import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import ProductCard from "../../components/common/ProductCard";
import Fab from "../../components/common/Fab";
import { products, categories } from "../../helpers/seed";
import ChipCategory from "../../components/common/ChipCategory";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import InputModal from "../../components/common/InputModal";
// import { getAllCategories } from "../../services/categories";

const { mainColor } = globalStyles;

const statusBarStyle = "dark-content";

const { width } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

const InventoryScreen = ({ navigation }: Props) => {
  const [selected, setSelected] = useState(categories[0].id);
  const [modalState, setModalState] = useState(false);
  const [category, setCategory] = useState("");

  // Example to use query
  // const { data } = useQuery("categories", getAllCategories);
  // console.log("data ==>", data);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header name="Productos">
        <Icon onPress={() => navigation.navigate("SearchScreen")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => Alert.alert("Search")}>
          <More name="more-vertical" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <View>
        <View style={styles.container}>
          {/* <Icon
            onPress={() => navigation.navigate("Category")}
            style={{ marginRight: 10 }}
          >
            <Plus name="plus" size={30} color="#5196FE" />
          </Icon> */}
          <Icon style={{ marginRight: 10 }}>
            <InputModal
              isModalVisible={modalState}
              setIsModalVisible={setModalState}
              setSelectedOption={setCategory}
              selectedOption={category}
              buttonDisabled={category == ""}
              buttonText="Crear Categoría"
              buttonStyle={{ backgroundColor: mainColor, height: 55 }}
              onPress={() => console.log("category", category)}
            />
          </Icon>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              {categories.map((category) => (
                <ChipCategory
                  key={category.id}
                  name={category.name}
                  containerStyle={
                    category.id === selected ? mainColor : "#f9f9f9"
                  }
                  textStyle={category.id === selected ? "white" : mainColor}
                  onPress={() => setSelected(category.id)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 30,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 80,
          }}
        >
          {products.map((item) => (
            <ProductCard
              onPress={() => navigation.navigate("ProductDetail")}
              key={item.id}
              data={item}
            />
          ))}
        </View>
      </ScrollView>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        marginLeft={20}
        color={mainColor}
        text="Crear Producto"
        onPress={() => navigation.navigate("NewProduct")}
      />
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
