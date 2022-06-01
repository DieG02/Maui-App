import { View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import { NavigationProp, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

interface Props {
  navigation: NavigationProp<any, any>;
}

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const getToken = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const token = user ? JSON.parse(user).token : "";
      console.log("token", token);
      if (token) {
        // navigation.navigate("HomeTabs");
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
      <ActivityIndicator size="large" color="#141414" />
    </View>
  );
};

export default SplashScreen;
