import { StatusBar, ToastAndroid, Text } from "react-native";
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
import { editUserAccountBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import LoadingComponent from "../../components/Library/LoadingComponent";
import Form from "../../components/Library/Form";
import useForm from "../../hooks/useForm";
import PencilImageInput from "../../components/common/PencilImageInput";
import PhoneInput from "../../components/common/PhoneInput";

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
  const { params } = route
  const [country, setCountry] = useState(params?.data?.countryCode)
  const [modal, setModal] = useState(false)
  const { values, setValues } = useForm<editUserAccountBodyInputDto>(params?.data)
  const email = params?.email
  const isChanged = JSON.stringify(values) !== JSON.stringify(params?.data)

  const data: editUserAccountBodyInputDto = {
    cellPhone: values.cellPhone,
    name: values.name,
    address: values.address,
    countryCode: country
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
        <ImageProfile
          url={values.image}
          name={values.name}
        />
        <PencilImageInput
          values={values}
          setValues={setValues}
        />
        <Spacer height={10} />
        <CommonInput
          value={values.name}
          setValue={name => setValues({ ...values, name })}
          name="Nombre"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <CommonInput
          value={values.address}
          setValue={address => setValues({ ...values, address })}
          name="Direccion"
          placeholder="Escriba su direccion"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <PhoneInput
          value={values.cellPhone}
          setValue={cellPhone => setValues((prev: editUserAccountBodyInputDto) => ({ ...prev, cellPhone }))}
          isModalVisible={modal}
          setIsModalVisible={setModal}
          selectedOption={country}
          setSelectedOption={(value) => setCountry(value)}
          placeholder="Numero de Celular"
          marginBottom={20}
          notRequired
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
      </Form>
    </ScreenContainer>
  )
}

export default UserData;