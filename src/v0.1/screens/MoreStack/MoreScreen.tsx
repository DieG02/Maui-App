import React, { useContext } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import Spacer from "../../components/common/Spacer";
import OptionCard from "../../components/common/OptionCard";
import Right from "react-native-vector-icons/Entypo";
import Business from "react-native-vector-icons/FontAwesome";
import Costumer from "react-native-vector-icons/FontAwesome";
import Contact from "react-native-vector-icons/MaterialIcons";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from "react-query";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import ProfileComponent from "../../components/common/ProfileComponent";
import { profileData } from "../../services/profiles";

const { name, lastName, email, img } = profileData;

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
      <StatusBar barStyle={statusBarStyle} backgroundColor="#f3f6f8" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeaderTitle
          label=""
          onPressBack={() => navigation.goBack()}
          headerStyle={{
            backgroundColor: "#f3f6f8",
          }}
        />
        <View
          style={{
            backgroundColor: "#f3f6f8",
          }}
        >
          <ProfileComponent
            userName={name}
            userLastName={lastName}
            email={email}
            imgProfile={img}
          />
          <Spacer height={10} />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Spacer height={10} />
          <OptionCard
            title="Mis datos"
            onPress={() => navigation.navigate("UserData")}
            arrow={
              <Right name="chevron-small-right" color="#8B98B1" size={35} />
            }
            icon={<Business name="user" color="#8B98B1" size={25} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Clientes"
            onPress={() => navigation.navigate("Clients")}
            arrow={
              <Right name="chevron-small-right" color="#8B98B1" size={35} />
            }
            icon={<Contact name="contact-page" color="#8B98B1" size={28} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Provedores"
            onPress={() => navigation.navigate("Providers")}
            arrow={
              <Right name="chevron-small-right" color="#8B98B1" size={35} />
            }
            icon={<Costumer name="truck" color="#8B98B1" size={25} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Salir"
            onPress={() => handleLogout()}
            icon={<Costumer name="sign-out" color="#8B98B1" size={25} />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default More;
