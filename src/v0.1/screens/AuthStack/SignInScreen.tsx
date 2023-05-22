import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import CommonInput from "../../components/common/CommonInput";
import customStyles from "../../styles/customStyles";
import logo from "../../assets/logo.png";
import { useMutation } from "react-query";
import { signIn } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import ScreenContainer from "../../components/containers/ScreenContainer";
import Form from "../../components/Library/Form";
import Button from "../../components/common/Button";
import useForm from "../../hooks/useForm";
import SecureInput from "../../components/common/SecureInput";

interface Props {
  navigation: NavigationProp<any, any>;
}
const { mainColor, textBlack, white, background2 } = customStyles;
const statusBarStyle = "dark-content";

interface LoginUser {
  email: string;
  password: string;
}

const initialValues: LoginUser = {
  email: "",
  password: "",
};

const toValidate = ["email", "password"];

export default function LoginScreen({ navigation }: Props) {
  const { setIsLoggedIn } = useContext(AuthContext);

  const { setValues, validateValues, values } =
    useForm<LoginUser>(initialValues);

  const { mutateAsync } = useMutation(signIn);

  const onPressLogin = async () => {
    const data = await mutateAsync(values);

    if (data.token) {
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoggedIn(true);
      navigation.navigate("HomeTabs");
    }
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={white} barStyle={statusBarStyle} />
      <Form>
        <View
          style={{
            marginTop: 60,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 35 }}>
            <Image source={logo} style={{ width: 200, height: 40 }} />
          </View>

          <CommonInput
            required
            name="Email"
            value={values.email}
            marginBottom={25}
            placeholder="Ingrese su email"
            autoCapitalize="none"
            keyboardType="email-address"
            setValue={(text) => setValues((prev) => ({ ...prev, email: text }))}
          />

          <SecureInput
            required
            secureTextEntry={true}
            name="Contraseña"
            setValue={(text) =>
              setValues((prev) => ({ ...prev, password: text }))
            }
            value={values.password}
            placeholder="Ingrese su contraseña"
            marginBottom={25}
          />

          <Button
            disabled={!validateValues(toValidate)}
            onPress={onPressLogin}
            text="Iniciar Sesión"
            color={validateValues(toValidate) ? white : mainColor}
            style={{
              backgroundColor: validateValues(toValidate)
                ? mainColor
                : background2,
              height: 55,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
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
      </Form>
    </ScreenContainer>
  );
}
