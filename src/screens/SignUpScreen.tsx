import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import CommonInput from "../components/common/CommonInput";
import globalStyles from "../styles/globalStyles";
import { useMutation } from "react-query";
import { signUp } from "../services/auth";
import { signUpInputBodyDto } from "../../../Maui-Backend/src/controllers/types";
import ScreenContainer from "../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../components/common/HeaderTitle";

interface Props {
  navigation: NavigationProp<any, any>;
}
const { mainColor, textBlack } = globalStyles;

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const user = {
    email: email,
    password: password,
  };

  const { mutateAsync } = useMutation(
    (data: signUpInputBodyDto) => {
      return signUp(data);
    },
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: () => {
        navigation.navigate("Login");
      },
    }
  );

  const onPressSignUp = async () => {
    await mutateAsync(user);
  };

  return (
    <ScreenContainer>
      <BackHeaderTitle label="Crear cuenta" onPressBack={() => {}} />
      <View
        style={{
          marginHorizontal: 25,
          marginTop: 25,
        }}
      >
        <CommonInput
          name="Nombre"
          setValue={setName}
          value={name}
          marginBottom={15}
          placeholder="Ingrese su nombre"
          keyboardType="default"
        />

        <CommonInput
          name="Celular"
          setValue={setPhone}
          value={phone}
          marginBottom={15}
          placeholder="Ingrese su Celular"
          keyboardType="phone-pad"
        />

        <CommonInput
          name="Email"
          setValue={setEmail}
          value={email}
          marginBottom={15}
          placeholder="Ingrese su email"
          keyboardType="email-address"
        />

        <CommonInput
          name="Contraseña"
          setValue={setPassword}
          value={password}
          placeholder="Ingrese su contraseña"
          marginBottom={15}
        />

        <TouchableOpacity
          onPress={onPressSignUp}
          style={{
            backgroundColor: mainColor,
            height: 55,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Gilroy-Bold",
              fontSize: 16,
            }}
          >
            Crear cuenta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              color: textBlack,
              fontFamily: "Gilroy-Regular",
              fontSize: 16,
            }}
          >
            ¿Ya tenes cuenta?
          </Text>
          <Text
            style={{
              color: mainColor,
              fontFamily: "Gilroy-Bold",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
