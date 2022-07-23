import { View, Image } from "react-native";
import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { NavigationProp, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: NavigationProp<any, any>;
}

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
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
  }, []);

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
        <Image source={logo} style={{ width: 200, height: 50 }} />
      </View>
    </View>
  );
};

export default SplashScreen;
