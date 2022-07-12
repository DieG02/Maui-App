import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import CommonInput from "../components/common/CommonInput";
import globalStyles from "../styles/globalStyles";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { trpc } from "../utils/trpc";

interface Props {
  navigation: NavigationProp<any, any>;
}
const { mainColor, secondaryColor } = globalStyles;

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  console.log("isLoggedIn", isLoggedIn);

  const user = {
    email: email,
    password: password
  };

  const { mutateAsync } = trpc.useMutation("auth.signUp", {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      navigation.navigate("Login");
    }
  });

  const onPressSignUp = async () => {
    await mutateAsync(user);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          marginHorizontal: 40,
          marginTop: 60
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
          onPress={onPressSignUp}
          style={{
            backgroundColor: mainColor,
            height: 55,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Gilroy-Bold",
              fontSize: 16
            }}
          >
            Crear cuenta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ display: "flex", flexDirection: "row", marginVertical: 20 }}
        >
          <Text
            style={{
              color: secondaryColor,
              fontFamily: "Gilroy-Regular",
              fontSize: 16
            }}
          >
            ¿Ya tenes cuenta?
          </Text>
          <Text
            style={{
              color: mainColor,
              fontFamily: "Gilroy-Bold",
              fontSize: 16,
              marginLeft: 5
            }}
          >
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
