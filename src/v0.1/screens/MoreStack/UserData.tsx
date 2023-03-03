import { View, StatusBar, ToastAndroid, Text, TouchableOpacity } from "react-native";
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
import Pencil from "react-native-vector-icons/Entypo";
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from "../../components/common/Modals/ImageModal";
import { checkCameraPermission, requestCameraPermission } from '../../requests'

const statusBarStyle = "dark-content";
const { mainColor, textBlack, background2 } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const openCamera = async () => {
  const photo = await ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true
  });

  return photo;
};

const showToast = () => {
  ToastAndroid.show(
    "Tu cuenta fue editada satisfactoriamente",
    ToastAndroid.SHORT
  );
};

const UserData = ({ navigation, route }: Props) => {
  const { params } = route;
  const [form, setForm] = useState(params?.data);
  const email = params?.email;
  const isChanged = JSON.stringify(form) !== JSON.stringify(params?.data);
  const [isVisible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const data: editUserAccountBodyInputDto = {
    cellPhone: form.cellPhone,
    name: form.name,
    address: form.address,
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

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      })
      setForm({ ...form, image: image.path })
      toggleModal();
    } catch (error) {
      console.log(error);
      toggleModal();
    }
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await checkCameraPermission();
      if (hasPermission){
        const image = await openCamera()
        setForm({ ...form, image: image.path })
        toggleModal()
      } else {
        await requestCameraPermission();
        const image = await openCamera()
        setForm({ ...form, image: image.path })
        toggleModal()
      }
    } catch (error) {
      console.log(error);
      toggleModal()
    }
  }

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
            url={form.image}
            name={form.name}
          />
          <TouchableOpacity
            style={{
              top: -30,
              marginHorizontal: "55%",
              borderRadius: 50,
              backgroundColor: background2,
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: -30
            }}
            onPress={toggleModal}
          >
            <Pencil name='pencil' size={18} color={mainColor} />
            <ImageModal
              isVisible={isVisible}
              setVisible={toggleModal}
              takePhoto={takePhoto}
              pickImage={pickImage}
            />
          </TouchableOpacity>
        </View>
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
          placeholder="Escriba su direccion"
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
