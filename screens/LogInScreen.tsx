import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import CommonInput from "../components/common/CommonInput";
import globalStyles from "../styles/globalStyles";
import logo from "../assets/logo.png";
import { useMutation } from "react-query";
import { signIn } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

interface Props {
  navigation: NavigationProp<any, any>;
}
const { mainColor, secondaryColor } = globalStyles;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  console.log("isLoggedIn", isLoggedIn);

  const user = {
    email: email,
    password: password,
  };

  const { mutateAsync } = useMutation(
    (data: object) => {
      return signIn(data);
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onPressLogin = async () => {
    console.log("user", user);
    const data = await mutateAsync(user);
    console.log("data ==>", data);

    if (data.token) {
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoggedIn(true);
      navigation.navigate("HomeTabs");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginHorizontal: 40,
          marginTop: 60,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 35 }}>
          <Image source={logo} style={{ width: 100, height: 30 }} />
        </View>

        <CommonInput
          name="Email"
          setValue={setEmail}
          value={email}
          marginBottom={25}
          placeholder="Ingrese su email"
        />

        <CommonInput
          name="Contraseña"
          setValue={setPassword}
          value={password}
          placeholder="Ingrese su contraseña"
          marginBottom={25}
        />

        <TouchableOpacity
          onPress={onPressLogin}
          style={{
            backgroundColor: mainColor,
            height: 55,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Gilroy-Bold",
              fontSize: 16,
            }}
          >
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={{ display: "flex", flexDirection: "row", marginVertical: 20 }}
        >
          <Text
            style={{
              color: secondaryColor,
              fontFamily: "Gilroy-Regular",
              fontSize: 16,
            }}
          >
            ¿No tenes cuenta?
          </Text>
          <Text
            style={{
              color: mainColor,
              fontFamily: "Gilroy-Bold",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            Crear cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
