import {
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useContext, useMemo } from "react";
import ContactCard from "../../components/common/ContactCard";
import globalStyles from "../../styles/globalStyles";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getAllContacts } from "../../services/contacts";
import { GeneralContext } from "../../context/GeneralContext";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
const { mainColor, width } = globalStyles;
const statusBarStyle = "dark-content";

const Consumers = ({ navigation, route }: Props) => {
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

  const handleOnPress = (item: IContact) => {
    if (route.params !== undefined) {
      navigation.navigate({
        name: "NewIncome",
        params: { contact: item },
        merge: true,
      });
    } else {
      Alert.alert("Contacto en Detalle");
    }
  };

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
        label="Clientes"
        onPressBack={() => navigation.goBack()}
        withSearch
        onPressSearch={() => Alert.alert("Search")}
      />
      <FlatList
        overScrollMode="never"
        data={clients}
        style={{ flex: 1, backgroundColor: "white", marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title=" No tenes clientes registrados"
            percentage={0.25}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={() => {
          getClients();
        }}
        onEndReached={() => {
          getClients();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <ContactCard
            data={item}
            type="client"
            onPress={() => handleOnPress(item)}
          />
        )}
      />
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
          onPress={() =>
            navigation.navigate("NewContact", {
              type: "client",
              screen: route.params?.screen,
            })
          }
          text="Crear / Importar Contacto"
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

export default Consumers;
