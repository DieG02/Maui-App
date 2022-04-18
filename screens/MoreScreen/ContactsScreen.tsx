import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Search from "react-native-vector-icons/Feather";
import More from "react-native-vector-icons/Feather";
import Bill from "react-native-vector-icons/FontAwesome5";
import Bank from "react-native-vector-icons/FontAwesome";
import Costumer from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ContactCard from "../../components/common/ContactCard";
import { getConsumers } from "../../services/test";
import Button from "../../components/common/Button";
import Fab from "../../components/common/Fab";
import { NavigationProp } from "@react-navigation/native";

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
          consumers.map((item: any) => (
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
          consumers.map((item: any) => (
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
            consumers.map((item: any) => (
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
interface Props {
  navigation: NavigationProp<any, any>;
}
export default function Contacts({ navigation }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          height: Platform.select({
            ios: 52,
            android: 0,
          }),
        }}
      />
      <Header
        name="Contactos"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }
      >
        <Icon onPress={() => Alert.alert("Search")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => Alert.alert("Search")}>
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
          tabBarLabelStyle: { fontSize: 11, fontWeight: "bold" },

          tabBarIndicatorStyle: {
            backgroundColor: "#3784F9",
            height: 50,
            borderRadius: 15,
          },
          tabBarItemStyle: {
            borderRadius: 15,
            height: 50,
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
        onPress={() => Alert.alert("Crear Producto")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
