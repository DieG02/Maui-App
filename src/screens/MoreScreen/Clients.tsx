import {
  View,
  Alert,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useContext, useMemo } from "react";
import ContactCard from "../../components/common/ContactCard";
import globalStyles from "../../styles/globalStyles";
import Fab from "../../components/common/Fab";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Search from "react-native-vector-icons/Feather";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getAllContacts } from "../../services/contacts";
import { GeneralContext } from "../../context/GeneralContext";

interface Props {
  navigation: NavigationProp<any, any>;
}
const { mainColor, width } = globalStyles;
const statusBarStyle = "dark-content";

const Consumers = ({ navigation }: Props) => {
  const { setContacts } = useContext(GeneralContext);

  const {
    data,
    isLoading,
    refetch: getClients,
  } = useQuery("clients", getAllContacts, {
    onSuccess(data) {
      setContacts(
        data?.filter((item) => item.typeOfContact === "CLIENT") as []
      );
    },
  });

  const clients = useMemo(() => {
    const res = data?.filter((item) => item.typeOfContact === "CLIENT");
    return res;
  }, [data]);

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
        name="Clientes"
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
      <FlatList
        data={clients}
        style={{ flex: 1, backgroundColor: "white", marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={() => {
          getClients();
        }}
        onEndReached={() => {
          getClients();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ContactCard data={item} type="client" />}
      />
      <View
        style={{
          backgroundColor: "white",
          height: 64,
          width: "100%",
        }}
      >
        <Fab
          bottom={0}
          left={0}
          width={width - 40}
          height={50}
          marginLeft={20}
          color={mainColor}
          text="Crear / Importar Contacto"
          onPress={() => navigation.navigate("NewContact", { type: "client" })}
        />
      </View>
    </SafeAreaView>
  );
};

export default Consumers;
