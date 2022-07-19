import React, { useContext } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Spacer from "../../components/common/Spacer";
import OptionCard from "../../components/common/OptionCard";
import Right from "react-native-vector-icons/Entypo";
import Profile from "react-native-vector-icons/FontAwesome";
import Business from "react-native-vector-icons/FontAwesome";
import Debts from "react-native-vector-icons/FontAwesome5";
import Costumer from "react-native-vector-icons/FontAwesome";
import Message from "react-native-vector-icons/MaterialIcons";
import Faq from "react-native-vector-icons/FontAwesome5";
import Budget from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";

const { mainColor } = globalStyles;

const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const More = ({ navigation }: Props) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          name="Perfil"
          color="white"
          icon={
            <Icon onPress={() => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color={mainColor} />
            </Icon>
          }
        />
        <Spacer height={10} />
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                marginRight: 20,
                backgroundColor: "#7888a8",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                BB
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "#131313",

                  fontFamily: "Gilroy-Medium",
                }}
              >
                Billy Bautista
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: mainColor,
                    fontFamily: "Gilroy-Regular",
                    fontSize: 15,
                  }}
                >
                  Ver mi perfil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <OptionCard
            title="Negocio"
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Business name="building" color={mainColor} size={20} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Presupuestos"
            onPress={() => navigation.navigate("Budget")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Budget name="sale" color={mainColor} size={25} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Deudas"
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Debts name="calculator" color={mainColor} size={20} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Clientes"
            onPress={() => navigation.navigate("Clients")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Costumer name="user" color={mainColor} size={25} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Provedores"
            onPress={() => navigation.navigate("Providers")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Costumer name="truck" color={mainColor} size={25} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Empleados"
            onPress={() => navigation.navigate("Employees")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Costumer name="group" color={mainColor} size={25} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Soporte"
            arrow={<Profile name="whatsapp" color="#00bb2d" size={22} />}
            icon={<Message name="message" color={mainColor} size={20} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Preguntas Frecuentes"
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Faq name="question-circle" color={mainColor} size={20} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Cerrar Sesión"
            onPress={() => handleLogout()}
            icon={<Faq name="power-off" color="red" size={20} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default More;
