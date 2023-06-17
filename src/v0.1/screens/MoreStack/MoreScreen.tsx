import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import Spacer from "../../components/common/Spacer";
import OptionCard from "../../components/common/OptionCard";
import Right from "react-native-vector-icons/Entypo";
import Business from "react-native-vector-icons/FontAwesome";
import Costumer from "react-native-vector-icons/FontAwesome";
import Contact from "react-native-vector-icons/MaterialIcons";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import ProfileBadge from "../../components/Library/ProfileBadge";
import customStyles from "../../styles/customStyles";
import useGetAccount from "../../services/Account/useGetAccount";
import { queryClient } from "../../utils/queryClient";

const { textBlack, marginHorizontal, babyBlue } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const More = ({ navigation }: Props) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { data, refetch } = useGetAccount();
  const [email, setEmail] = useState("");

  const getEmail = async () => {
    const storage = await AsyncStorage.getItem("userInfo");
    const email = storage ? JSON.parse(storage).email : "";
    return setEmail(email);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getEmail();
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    queryClient.clear();
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeaderTitle
          label=""
          onPressBack={() => navigation.goBack()}
          headerStyle={{
            backgroundColor: babyBlue,
          }}
        />
        <View
          style={{
            backgroundColor: babyBlue,
            alignItems: "center",
          }}
        >
          <ProfileBadge user={data} size="large" />
          <Text
            style={{
              fontSize: 25,
              color: textBlack,
              fontFamily: "Gilroy-Medium",
              marginTop: 20,
            }}
          >
            {data?.name}
          </Text>
          <Text
            style={{
              color: textBlack,
              fontFamily: "Gilroy-Regular",
              marginTop: 5,
              fontSize: 18,
            }}
          >
            {email}
          </Text>
          <Spacer height={20} />
        </View>
        <View style={{ marginHorizontal: marginHorizontal }}>
          <Spacer height={30} />
          <OptionCard
            title="Mis datos"
            onPress={() => navigation.navigate("UserData", { data, email })}
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={30} />
            }
            icon={<Business name="user" color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Clientes"
            onPress={() => navigation.navigate("Clients")}
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={30} />
            }
            icon={<Contact name="contact-page" color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Provedores"
            onPress={() => navigation.navigate("Providers")}
            arrow={
              <Right name="chevron-small-right" color={textBlack} size={30} />
            }
            icon={<Costumer name="truck" color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            title="Cerrar sesión"
            onPress={() => handleLogout()}
            icon={<Costumer name="sign-out" color={textBlack} size={22} />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default More;
