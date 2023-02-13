import { View, StatusBar, ToastAndroid, Text } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import React, { useState } from "react";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import customStyles from "../../styles/customStyles";
import Spacer from "../../components/common/Spacer";
import CommonInput from "../../components/common/CommonInput";
import Button from "../../components/common/Button";
import { editUserAccount } from "../../services/userAccount";
import ImageProfile from "../../components/common/ImageProfile";
import { useMutation } from "react-query";
import { editUserAccountBodyInputDto } from "../../../../Maui-Backend/src/controllers/types";

const statusBarStyle = "dark-content";
const { mainColor, textBlack } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const UserData = ({ navigation, route }: Props) => {
  const {params} = route;
  const [form, setForm] = useState(params?.data)
  const email = params?.email
  const isChanged = JSON.stringify(form) !== JSON.stringify(params?.data)

  const data: editUserAccountBodyInputDto = {
    cellPhone: form.cellPhone,
    name: form.name,
    address: form.address,
  }

  const {mutateAsync: editAccount} = useMutation(
    () => editUserAccount(data),
    {
      onSuccess: () => {
        navigation.goBack();
        showToast();
      }
    }
  );

  const showToast = () => {
    ToastAndroid.show(
      "Tu cuenta fue editada satisfactoriamente",
      ToastAndroid.SHORT
    );
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <BackHeaderTitle
        label="Mis Datos"
        onPressBack={() => navigation.goBack()}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Spacer height={10} />
        <ImageProfile
          url={form.image}
          name={form.name}
        />
        <Spacer height={10} />
        <CommonInput
          value={form.name}
          setValue={(value) => setForm({ ...form, name: value })}
          name="Nombre"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <CommonInput
          value={form.address}
          setValue={(value) => setForm({ ...form, address: value })}
          name="Direccion"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <CommonInput
          value={form.cellPhone}
          setValue={(value) => setForm({ ...form, cellPhone: value })}
          name="Numero de Celular"
          marginBottom={20}
          keyboardType="phone-pad"
        />
        <Spacer height={5} />
        <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: "Gilroy-Bold",
          marginBottom: 10,
        }}
        >
          Correo
        </Text>
        <Text
          style={{
            color: textBlack,
            fontFamily: "Gilroy-Regular",
            marginTop: 5,
            marginLeft: 20,
            fontSize: 18,
          }}
        >
          {email}
        </Text>
        <Spacer height={15} />
        <View>
          <Button
            text="Guardar"
            onPress={() => editAccount()}
            disabled={!isChanged}
            style={{ backgroundColor: isChanged ? mainColor : "#B3B3B3" }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default UserData;
