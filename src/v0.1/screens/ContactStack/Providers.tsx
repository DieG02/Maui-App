import { View, FlatList, ActivityIndicator, StatusBar } from "react-native";
import React, { useContext, useMemo, useState } from "react";
import ContactCard from "../../components/common/ContactCard";
import customStyles from "../../styles/customStyles";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getAllContacts } from "../../services/contacts";
import { GeneralContext } from "../../context/GeneralContext";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import SearchBar from "../../components/common/SearchBar";

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const { mainColor, width, background } = customStyles;
const statusBarStyle = "dark-content";

const Providers = ({ navigation, route }: Props) => {
  const { setContacts } = useContext(GeneralContext);
  const [text, onChangeText] = useState("");
  const [isSearch, setIsSearch] = useState(false);

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
    const res = data?.filter((item) => item.typeOfContact === "PROVIDER");
    const filtered = res?.filter((item) =>
      item.name?.toLowerCase().startsWith(text.toLowerCase())
    );
    return filtered;
  }, [data, text]);

  const handleOnPress = (item: IContact) => {
    if (route.params !== undefined) {
      navigation.navigate({
        name: "NewExpense",
        params: { contact: item },
        merge: true,
      });
    } else {
      navigation.navigate("ContactDetail", { contact: item });
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
      {!isSearch ? (
        <BackHeaderTitle
          label="Proveedores"
          onPressBack={() => navigation.goBack()}
          withSearch
          onPressSearch={() => setIsSearch(true)}
        />
      ) : (
        <SearchBar
          onChangeText={onChangeText}
          text={text}
          placeholder="Buscar ..."
          onPress={() => {
            onChangeText("");
            setIsSearch(false);
          }}
          onBlur={() => text.length === 0 && setIsSearch(false)}
        />
      )}
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
          height: 90,
          alignItems: "center",
          backgroundColor: background,
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
            marginTop: 6,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default Providers;
