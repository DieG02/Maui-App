import {
  // Text,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Search from "react-native-vector-icons/Feather";
import globalStyles from "../../styles/globalStyles";
import {
  checkPermission,
  fetchContacts,
  requestContactPermission,
} from "../../../utils";
import AddContact from "../../components/common/AddContact";

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = "dark-content";
3;
const { mainColor } = globalStyles;

interface Contact {
  name: string;
  phone: string;
  id: string;
}

const NewContact = ({ route, navigation }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { params } = route;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header
        name="Agregar Contactos"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color={mainColor} />
          </Icon>
        }
      >
        <Icon onPress={() => Alert.alert("Search")}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <ScrollView
        overScrollMode="never"
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 60 }}>
          {contacts &&
            contacts.map((item) => (
              <AddContact data={item} key={item.id} type={params?.type} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewContact;
