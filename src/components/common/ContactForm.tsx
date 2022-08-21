import { View, ScrollView } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CommonInput from "./CommonInput";
import Button from "./Button";
import globalStyles from "../../styles/globalStyles";
import { createContactBodyInputDto } from "../../../../Maui-Backend/src/controllers/types";
import { useMutation } from "react-query";
import { createNewContact } from "../../services/contacts";
import { NavigationProp } from "@react-navigation/native";

const { mainColor } = globalStyles;

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  comments: string;
  setComments: (value: string) => void;
  screen: string;
  type: createContactBodyInputDto["typeOfContact"];
  navigation: NavigationProp<any, any>;
}

const ContactForm = ({
  isModalVisible,
  setIsModalVisible,
  phone,
  setPhone,
  comments,
  setComments,
  email,
  setEmail,
  name,
  setName,
  type,
  screen,
  navigation,
}: Props) => {
  const handleOnPress = (data: IContact) => {
    if (screen === "NewIncome") {
      navigation.navigate("NewIncome", { contact: data });
    }
    if (screen === "NewExpense") {
      navigation.navigate("NewExpense", { contact: data });
    } else {
      type.toUpperCase() === "CLIENT"
        ? navigation.navigate("Clients", { contact: data })
        : navigation.navigate("Providers", { contact: data });
    }
  };

  const form: createContactBodyInputDto = {
    name: name,
    phone: phone,
    comments: comments,
    email: email,
    typeOfContact:
      type.toUpperCase() as createContactBodyInputDto["typeOfContact"],
  };

  const { mutateAsync } = useMutation(
    (form: createContactBodyInputDto) => {
      return createNewContact(form);
    },
    {
      onSuccess: (data) => {
        handleOnPress(data);
        console.log("data", data);
      },
    }
  );

  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      onBackButtonPress={() => setIsModalVisible(false)}
    >
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          borderRadius: 15,
        }}
      >
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 30,
            marginVertical: 20,
          }}
        >
          <CommonInput
            name="Nombre"
            placeholder="Nombre del contacto"
            marginBottom={20}
            value={name}
            setValue={setName}
          />
          <CommonInput
            name="Celular"
            placeholder="Número de celular"
            marginBottom={20}
            value={phone}
            setValue={setPhone}
            keyboardType="phone-pad"
          />
          <CommonInput
            name="Email"
            placeholder="Email del contacto"
            marginBottom={20}
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
          />
          <CommonInput
            name="Comentario"
            placeholder="Comentarios"
            marginBottom={20}
            value={comments}
            setValue={setComments}
            multiline={true}
          />
          <Button
            text="Crear contacto"
            onPress={() => mutateAsync(form)}
            style={{ backgroundColor: mainColor, height: 50 }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ContactForm;
