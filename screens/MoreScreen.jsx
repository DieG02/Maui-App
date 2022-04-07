import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import theme from "../styles/themeStyles";
import Spacer from "../components/Spacer";
import Header from "../components/Header";
import OptionCard from "../components/OptionCard";
import Right from "react-native-vector-icons/Entypo";
import Profile from "react-native-vector-icons/FontAwesome5";
import Business from "react-native-vector-icons/FontAwesome";
import Debts from "react-native-vector-icons/FontAwesome5";
import Costumer from "react-native-vector-icons/MaterialIcons";
import Message from "react-native-vector-icons/MaterialIcons";
import Faq from "react-native-vector-icons/FontAwesome5";
import WhatsApp from "react-native-vector-icons/Fontisto";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/AntDesign";

const statusBarStyle = "dark-content";

function More({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
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
            <Icon name="close" size={30} color="#3784F9" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: "#60708F",

              fontFamily: "Gilroy-Regular",
            }}
          >
            Mi Cuenta
          </Text>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="poweroff" size={25} color="#1A1A1A" />
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
                backgroundColor: "#3784F9",
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
                JB
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
                Juan Bautista
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#3784F9",
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
              <Right name="chevron-small-right" color="#3784F9" size={35} />
            }
            icon={<Business name="building" color="#60708F" size={22} />}
          />

          <Spacer height={15} />
          <OptionCard
            title="Deudas"
            arrow={
              <Right name="chevron-small-right" color="#3784F9" size={35} />
            }
            icon={<Debts name="calculator" color="#60708F" size={22} />}
          />
          <Spacer height={15} />
          <OptionCard
            title="Contactos"
            onPress={() => navigation.navigate("Contacts")}
            arrow={
              <Right name="chevron-small-right" color="#3784F9" size={35} />
            }
            icon={<Costumer name="contact-page" color="#60708F" size={30} />}
          />

          <Spacer height={15} />
          <OptionCard
            title="Soporte"
            arrow={<WhatsApp name="whatsapp" color="#00bb2d" size={22} />}
            icon={<Message name="message" color="#60708F" size={22} />}
          />
          <Spacer height={15} />
          <OptionCard
            title="Preguntas Frecuentes"
            arrow={
              <Right name="chevron-small-right" color="#3784F9" size={35} />
            }
            icon={<Faq name="question-circle" color="#60708F" size={22} />}
          />
          <Spacer height={30} />
        </View>
      </ScrollView>
    </View>
  );
}

export default More;
