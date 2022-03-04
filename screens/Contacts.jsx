import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import Bill from "react-native-vector-icons/FontAwesome5";
import Bank from "react-native-vector-icons/FontAwesome";
import Costumer from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ContactCard from "../components/ContactCard";
import { getConsumers } from "../services/test";
import Button from "../components/Button";
import Fab from "../components/Fab";

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get("window");

export const Consumers = () => {
  const [consumers, setConsumers] = useState([]);

  const getAllConsumers = async () => {
    try {
      const response = await getConsumers();

      setConsumers(response.data);
      console.log(response.data);
      console.log(response.data[0].username);
    } catch (error) {}
  };

  useEffect(() => {
    getAllConsumers();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 60 }}>
        {consumers &&
          consumers.map((item) => (
            <ContactCard
              key={item.id}
              name={item.name.firstname + " " + item.name.lastname}
              phone={item.phone}
              type="consumer"
            />
          ))}
      </View>
    </ScrollView>
  );
};

export const Providers = () => {
  const [consumers, setConsumers] = useState([]);

  const getAllConsumers = async () => {
    try {
      const response = await getConsumers();

      setConsumers(response.data);
      console.log(response.data);
      console.log(response.data[0].username);
    } catch (error) {}
  };

  useEffect(() => {
    getAllConsumers();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 60 }}>
        {consumers &&
          consumers.map((item) => (
            <ContactCard
              key={item.id}
              name={item.name.firstname + " " + item.name.lastname}
              phone={item.phone}
              type="provider"
            />
          ))}
      </View>
    </ScrollView>
  );
};

export const Employees = () => {
  const [consumers, setConsumers] = useState([]);

  const getAllConsumers = async () => {
    try {
      const response = await getConsumers();

      setConsumers(response.data);
      console.log(response.data);
      console.log(response.data[0].username);
    } catch (error) {}
  };

  useEffect(() => {
    getAllConsumers();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 60 }}>
          {consumers &&
            consumers.map((item) => (
              <ContactCard
                key={item.id}
                name={item.name.firstname + " " + item.name.lastname}
                phone={item.phone}
                type="employee"
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default function Contacts({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        name="Contactos"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }
      >
        <Icon onPress={() => alert("Search")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => alert("Search")}>
          <More name="more-vertical" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <Tab.Navigator
        style={{ backgroundColor: "#fff" }}
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            marginHorizontal: 20,
            backgroundColor: "white",
            marginBottom: 4,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#3784F9",
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: "#3784F9",
            height: 60,
            borderRadius: 15,
          },
          tabBarItemStyle: {
            marginHorizontal: 1,
            borderRadius: 15,
            height: 60,
          },
        }}
      >
        <Tab.Screen name="Clientes" component={Consumers} />
        <Tab.Screen name="Proveedores" component={Providers} />
        <Tab.Screen name="Empleados" component={Employees} />
      </Tab.Navigator>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        height={50}
        marginLeft={20}
        color="#3784F9"
        text="Crear Contacto"
        onPress={() => alert("Crear Producto")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
