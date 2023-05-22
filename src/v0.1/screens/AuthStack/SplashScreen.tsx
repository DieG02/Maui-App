import { View, Image } from "react-native";
import React from "react";
import logo from "../../assets/logo.png";
import { NavigationProp, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMount } from "react-use";

interface Props {
  navigation: NavigationProp<any, any>;
}

const SplashScreen = ({ navigation }: Props) => {
  useMount(() => {
    const getToken = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const token = user ? JSON.parse(user).token : "";
      if (token) {
        navigation.dispatch(StackActions.replace("HomeTabs"));
      } else {
        navigation.dispatch(StackActions.replace("Login"));
      }
    };
    getToken();
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Image source={logo} style={{ width: 260, height: 50 }} />
      </View>
    </View>
  );
};

export default SplashScreen;
