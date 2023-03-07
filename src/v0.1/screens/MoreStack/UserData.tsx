import { View, StatusBar, ToastAndroid, Text } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import React from "react";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import customStyles from "../../styles/customStyles";
import Spacer from "../../components/common/Spacer";
import CommonInput from "../../components/common/CommonInput";
import Button from "../../components/common/Button";
import { editUserAccount } from "../../services/userAccount";
import ImageProfile from "../../components/common/ImageProfile";
import { useMutation } from "react-query";
import { editUserAccountBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import LoadingComponent from "../../components/Library/LoadingComponent";
import Form from "../../components/Library/Form";
import useForm from "../../hooks/useForm";
import PencilImageInput from "../../components/common/PencilImageInput";

const statusBarStyle = "dark-content";
const { mainColor, textBlack } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const showToast = () => {
  ToastAndroid.show(
    "Tu cuenta fue editada satisfactoriamente",
    ToastAndroid.SHORT
  );
};

const UserData = ({ navigation, route }: Props) => {
  const { params } = route;
  const { values, setValues } = useForm<editUserAccountBodyInputDto>(params?.data);
  const email = params?.email;
  const isChanged = JSON.stringify(values) !== JSON.stringify(params?.data);

  const data: editUserAccountBodyInputDto = {
    cellPhone: values.cellPhone,
    name: values.name,
    address: values.address,
  };

  const { mutateAsync: editAccount, isLoading } = useMutation(
    () => editUserAccount(data),
    {
      onSuccess: () => {
        navigation.goBack();
        showToast();
      },
    }
  );

  if (isLoading) {
    return <LoadingComponent color={mainColor} />;
  }
  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <BackHeaderTitle
        label="Mis Datos"
        onPressBack={() => navigation.goBack()}
      />
      <Form>
        <Spacer height={10} />
        <View>
          <ImageProfile
            url={values.image}
            name={values.name}
          />
          <PencilImageInput
            values={values}
            setValues={setValues}
          />
        </View>
        <Spacer height={10} />
        <CommonInput
          value={values.name}
          setValue={(value) => setValues({ ...values, name: value })}
          name="Nombre"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <CommonInput
          value={values.address}
          setValue={(value) => setValues({ ...values, address: value })}
          name="Direccion"
          placeholder="Escriba su direccion"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <CommonInput
          value={values.cellPhone}
          setValue={(value) => setValues({ ...values, cellPhone: value })}
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
            style={{
              backgroundColor: isChanged ? mainColor : "#B3B3B3",
              marginBottom: 30,
              marginTop: 10
            }}
          />
        </View>
      </Form>
    </ScreenContainer>
  );
};

export default UserData;
