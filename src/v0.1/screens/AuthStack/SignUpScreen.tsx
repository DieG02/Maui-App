import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import customStyles from "../../styles/customStyles";
import { useMutation } from "react-query";
import { signUp } from "../../services/auth";
import { signUpInputBodyDto } from "../../../../../Maui-Backend/src/controllers/types";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import Form from "../../components/Library/Form";
import useForm from "../../hooks/useForm";
import Button from "../../components/common/Button";
import SecureInput from "../../components/common/SecureInput";
import PhoneInput from "../../components/common/PhoneInput";
import { countries } from "../../helpers/countries";

interface Props {
  navigation: NavigationProp<any, any>;
}

interface SignUpUser {
  email: string;
  password: string;
  name: string;
  cellphone: string;
  country: string;
  countryCode: string;
}

const initialValues = {
  email: "",
  password: "",
  name: "",
  cellphone: "",
  country: "",
  countryCode: "",
};

const { mainColor, textBlack } = customStyles;

const toValidate = ["email", "password", "name", "cellphone"];

export default function SignUpScreen({ navigation }: Props) {
  const [country, setCountry] = useState("+ 54");
  const [modal, setModal] = useState(false);

  const { setValues, validateValues, values } =
    useForm<SignUpUser>(initialValues);

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

  const countrySelected = useMemo(() => {
    return countries.filter((item) => item.id === country)[0];
  }, [country]);

  const onPressSignUp = async () => {
    await mutateAsync({
      ...values,
      country: countrySelected.name,
      countryCode: countrySelected.prefix,
    });
  };

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Crear cuenta"
        onPressBack={() => navigation.goBack()}
      />
      <Form>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <CommonInput
            required
            name="Nombre"
            setValue={(text) => setValues((prev) => ({ ...prev, name: text }))}
            value={values.name}
            marginBottom={25}
            placeholder="Ingrese su nombre"
            keyboardType="default"
          />
          <PhoneInput
            value={values.cellphone}
            setValue={(text) =>
              setValues((prev) => ({ ...prev, cellphone: text }))
            }
            isModalVisible={modal}
            setIsModalVisible={setModal}
            selectedOption={country}
            setSelectedOption={(value) => setCountry(value)}
            placeholder="Ingrese su Celular"
            marginBottom={25}
          />
          <CommonInput
            required
            name="Email"
            setValue={(text) => setValues((prev) => ({ ...prev, email: text }))}
            value={values.email}
            marginBottom={25}
            placeholder="Ingrese su email"
            keyboardType="email-address"
            autoCapitalize="none"
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
            onPress={onPressSignUp}
            text="Crear cuenta"
            style={{
              backgroundColor: validateValues(toValidate)
                ? mainColor
                : "#B3B3B3",
              height: 55,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          />
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
      </Form>
    </ScreenContainer>
  );
}
