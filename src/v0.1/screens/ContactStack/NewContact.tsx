import { StatusBar, ScrollView, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import customStyles from "../../styles/customStyles";
import {
  checkPermission,
  fetchContacts,
  requestContactPermission,
} from "../../requests";
import AddContact from "../../components/common/AddContact";
import ContactForm from "../../components/common/ContactForm";
import Button from "../../components/common/Button";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = "dark-content";

const { mainColor, width } = customStyles;

interface Contact {
  name: string;
  phone: string;
  id: string;
}

const NewContact = ({ route, navigation }: Props) => {
  const { params } = route;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const getContacts = async () => {
    setIsLoading(true);
    const contactos = await fetchContacts();
    setContacts(contactos);
    setIsLoading(false);
  };

  const getAllContactsFromPhone = async () => {
    const hasPermission = await checkPermission();
    if (hasPermission) {
      getContacts();
    } else {
      await requestContactPermission();
      getContacts();
    }
  };

  useEffect(() => {
    getAllContactsFromPhone();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#141414" />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <BackHeaderTitle
        label="Agregar Contactos"
        onPressBack={() => navigation.goBack()}
        withSearch
      />

      <ScrollView
        overScrollMode="never"
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          {contacts &&
            contacts.map((item) => (
              <AddContact
                data={item}
                key={item.id}
                type={params?.type}
                screen={params?.screen}
                navigation={navigation}
              />
            ))}
        </View>
        <ContactForm
          comments={comments}
          setComments={setComments}
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          type={params?.type}
          screen={params?.screen}
          navigation={navigation}
        />
      </ScrollView>

      <View
        style={{
          width: "100%",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Button
          text="Crear nuevo contacto"
          onPress={() => setIsModalVisible(true)}
          style={{
            backgroundColor: mainColor,
            width: width - 40,
            elevation: 4,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default NewContact;
