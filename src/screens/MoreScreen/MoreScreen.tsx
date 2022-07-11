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
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";

const { mainColor, secondaryColor } = globalStyles;

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
        <View
          style={{
            marginHorizontal: 20,
            height: 60,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 50,
              height: 50,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Icon name="close" size={40} color={mainColor} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: secondaryColor,
              fontFamily: "Gilroy-Regular",
            }}
          >
            Mi Cuenta
          </Text>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Profile name="power-off" size={25} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
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
                backgroundColor: mainColor,
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

                  fontFamily: "Gilroy-Bold",
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
            icon={<Business name="building" color={secondaryColor} size={20} />}
          />

          <Spacer height={15} />
          <OptionCard
            title="Deudas"
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Debts name="calculator" color={secondaryColor} size={20} />}
          />

          <Spacer height={15} />
          <OptionCard
            title="Clientes"
            onPress={() => navigation.navigate("Clients")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Costumer name="user" color={secondaryColor} size={25} />}
          />
          <Spacer height={15} />
          <OptionCard
            title="Provedores"
            onPress={() => navigation.navigate("Providers")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Costumer name="truck" color={secondaryColor} size={25} />}
          />
          <Spacer height={15} />
          <OptionCard
            title="Empleados"
            onPress={() => navigation.navigate("Employees")}
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={<Costumer name="group" color={secondaryColor} size={25} />}
          />
          <Spacer height={15} />
          <OptionCard
            title="Soporte"
            arrow={<Profile name="whatsapp" color="#00bb2d" size={22} />}
            icon={<Message name="message" color={secondaryColor} size={20} />}
          />
          <Spacer height={15} />
          <OptionCard
            title="Preguntas Frecuentes"
            arrow={
              <Right name="chevron-small-right" color={mainColor} size={35} />
            }
            icon={
              <Faq name="question-circle" color={secondaryColor} size={20} />
            }
          />
          <Spacer height={30} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default More;
