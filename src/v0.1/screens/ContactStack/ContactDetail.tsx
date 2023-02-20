import { Alert, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import Spacer from "../../components/common/Spacer";
import SimpleInput from "../../components/common/SimpleInput";
import Button from "../../components/common/Button";
import customStyles from "../../styles/customStyles";
import { useMutation } from "react-query";
import { updateContactById, deleteContactById } from "../../services/contacts";
import ScrollContainer from "../../components/containers/ScrollContainer";
import { queryClient } from "../../utils/queryClient";

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const { mainColor, background, width } = customStyles;

const ContactDetail = ({ route, navigation }: Props) => {
  const { params } = route;

  const initial = {
    name: params?.contact.name,
    email: params?.contact.email,
    phone: params?.contact.phone,
    comments: params?.contact.comments,
  };

  const [data, setData] = useState(initial);

  const isChanged = JSON.stringify(initial) !== JSON.stringify(data);

  const showToast = () => {
    ToastAndroid.show(
      "El contacto fue editado satisfactoriamente",
      ToastAndroid.SHORT
    );
  };

  const { mutateAsync: updateContact } = useMutation(
    () => updateContactById(params?.contact.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
        queryClient.invalidateQueries("providers");
        navigation.goBack();
        showToast();
      },
    }
  );

  const { mutateAsync: deleteContact } = useMutation(
    () => deleteContactById(params?.contact.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
        queryClient.invalidateQueries("providers");
        navigation.goBack();
        showToast();
      },
    }
  );

  const handleTitle = () => {
    if (params && params.contact.typeOfContact === "CLIENT") {
      return "Cliente";
    } else {
      return "Proveedor";
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Eliminar",
      "¿Estás seguro que deseas eliminar esta transacción?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteContact() },
      ]
    );
  };

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={handleTitle()}
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={handleDelete}
      />
      <ScrollContainer
        style={{
          paddingHorizontal: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Spacer height={20} />
        <SimpleInput
          setValue={(value) => setData({ ...data, name: value })}
          value={data.name}
          name="Nombre"
          marginBottom={20}
          placeholder="Nombre"
        />
        <SimpleInput
          setValue={(value) => setData({ ...data, phone: value })}
          value={data.phone}
          name="Celular"
          marginBottom={20}
          placeholder="Celular"
        />
        <SimpleInput
          setValue={(value) => setData({ ...data, email: value })}
          value={data.email}
          name="Correo electrónico"
          marginBottom={20}
          placeholder="Correo electrónico"
        />
        <SimpleInput
          setValue={(value) => setData({ ...data, comments: value })}
          value={data.comments}
          name="Comentarios"
          marginBottom={20}
          placeholder="Agrega un comentario"
        />
      </ScrollContainer>
      <View
        style={{
          width: "100%",
          height: 90,
          alignItems: "center",
          backgroundColor: background,
        }}
      >
        <Button
          disabled={!isChanged}
          onPress={() => updateContact()}
          text="Actualizar contacto"
          style={{
            backgroundColor: isChanged ? mainColor : "#B3B3B3",
            borderRadius: 25,
            elevation: 0,
            width: width - 40,
            marginTop: 6,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default ContactDetail;
