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
import Plus from "react-native-vector-icons/FontAwesome5";
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import ProductCard from "../components/common/ProductCard";
import Fab from "../components/common/Fab";
import { products, categories } from "../helpers/seed";
import ChipCategory from "../components/common/ChipCategory";
import { NavigationProp } from "@react-navigation/native";

const statusBarStyle = "dark-content";

const { width } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

const InventoryScreen = ({ navigation }: Props) => {
  const [selected, setSelected] = useState(categories[0].id);

  console.log("selected", selected);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header name="Productos">
        <Icon onPress={() => Alert.alert("Search")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => Alert.alert("Search")}>
          <More name="more-vertical" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <View>
        <View style={styles.container}>
          <Icon
            onPress={() => Alert.alert("Crear categoria")}
            style={{ marginRight: 10 }}
          >
            <Plus name="plus" size={40} color="#5196FE" />
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
                    category.id === selected ? "#3784F9" : "#f9f9f9"
                  }
                  textStyle={category.id === selected ? "white" : "#3784F9"}
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
          {products.map((i) => (
            <ProductCard
              onPress={() => navigation.navigate("ProductDetail")}
              key={i.id}
              image={i.image}
              price={i.price}
              description={i.description}
              stock={i.stock}
            />
          ))}
        </View>
      </ScrollView>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        marginLeft={20}
        color="#3784F9"
        text="Crear Producto"
        onPress={() => navigation.navigate("NewProduct")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    backgroundColor: "#3784F9",
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
    color: "#3784F9",
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
