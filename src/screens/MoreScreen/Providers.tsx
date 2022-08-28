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
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Search from "react-native-vector-icons/Feather";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getAllContacts } from "../../services/contacts";
import { GeneralContext } from "../../context/GeneralContext";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const { mainColor, width } = globalStyles;
const statusBarStyle = "dark-content";

const Providers = ({ navigation, route }: Props) => {
  const { setContacts } = useContext(GeneralContext);

  const {
    data,
    isLoading,
    refetch: getProviders,
  } = useQuery("providers", getAllContacts, {
    onSuccess(data) {
      setContacts(
        data?.filter((item) => item.typeOfContact === "PROVIDER") as []
      );
    },
  });

  const providers = useMemo(() => {
    return data?.filter((item) => item.typeOfContact === "PROVIDER");
  }, [data]);

  const handleOnPress = (item: IContact) => {
    if (route.params !== undefined) {
      navigation.navigate({
        name: "NewExpense",
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header
        name="Proveedores"
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
        overScrollMode="never"
        data={providers}
        style={{ flex: 1, backgroundColor: "white", marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        refreshing={false}
        ListEmptyComponent={() => (
          <EmptyState
            title=" No tenes proveedores registrados"
            percentage={0.25}
          />
        )}
        onRefresh={() => {
          getProviders();
        }}
        onEndReached={() => {
          getProviders();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <ContactCard
            data={item}
            type="provider"
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
          text="Crear / Importar Contacto"
          onPress={() =>
            navigation.navigate("NewContact", {
              type: "provider",
              screen: route.params?.screen,
            })
          }
          style={{
            backgroundColor: mainColor,
            width: width - 40,
            elevation: 4,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Providers;
