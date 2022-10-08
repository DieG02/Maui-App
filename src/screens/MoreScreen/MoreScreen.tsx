import React, { useContext } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import Spacer from "../../components/common/Spacer";
import OptionCard from "../../components/common/OptionCard";
import Right from "react-native-vector-icons/Entypo";
import Business from "react-native-vector-icons/FontAwesome";
import Debts from "react-native-vector-icons/FontAwesome5";
import Costumer from "react-native-vector-icons/FontAwesome";
import Faq from "react-native-vector-icons/FontAwesome5";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from "react-query";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";

const { textBlack, textBlue } = globalStyles;

const statusBarStyle = "dark-content";

interface Props {
  navigation: NavigationProp<any, any>;
}

const More = ({ navigation }: Props) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    queryClient.clear();
    setIsLoggedIn(false);
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeaderTitle
          label="Perfil"
          onPressBack={() => navigation.goBack()}
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
                  fontWeight: "bold",
                  fontFamily: "Gilroy-Medium",
                }}
              >
                Billy Bautista
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: textBlack,
                    fontFamily: "Gilroy-Regular",
                    fontSize: 15,
                  }}
                >
                  example@gmail.com
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{color: textBlue, fontSize:20, paddingLeft: 15}}>Mi Perfil</Text>
          <Spacer height={10} />
          <OptionCard
            title="Mis datos"
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={35} />
            }
            icon={<Business name="building" color={textBlack} size={20} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Mi negocio"
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={35} />
            }
            icon={<Business name="building" color={textBlack} size={20} />}
          />
          <Spacer height={5} />
          <Spacer height={5} />
          <Text style={{color: textBlue, fontSize:20, paddingLeft: 15}}>General</Text>
          <Spacer height={10} />
          <OptionCard
            title="Deudas"
            onPress={() => navigation.navigate("Debts")}
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={35} />
            }
            icon={<Debts name="calculator" color={textBlack} size={20} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Clientes"
            onPress={() => navigation.navigate("Clients")}
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={35} />
            }
            icon={<Costumer name="user" color={textBlack} size={25} />}
          />
          <Spacer height={5} />
          <OptionCard
            title="Provedores"
            onPress={() => navigation.navigate("Providers")}
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={35} />
            }
            icon={<Costumer name="truck" color={textBlack} size={25} />}
          />
          <Spacer height={5} />
          <Spacer height={5} />
          <OptionCard
            title="Cerrar Sesión"
            onPress={() => handleLogout()}
            icon={<Faq name="power-off" color="red" size={20} />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default More;
