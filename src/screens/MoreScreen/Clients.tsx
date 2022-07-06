import { View, ScrollView, Dimensions, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ContactCard from "../../components/common/ContactCard";
import { getConsumers } from "../../services/test";
import globalStyles from "../../styles/globalStyles";
import Fab from "../../components/common/Fab";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Search from "react-native-vector-icons/Feather";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any, any>;
}
const Consumers = ({ navigation }: Props) => {
  const [consumers, setConsumers] = useState([]);

  const getAllConsumers = async () => {
    try {
      const response = await getConsumers();
      setConsumers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllConsumers();
  }, []);

  const { mainColor } = globalStyles;

  const { width } = Dimensions.get("window");

  return (
    <>
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
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 60 }}>
          {consumers &&
            consumers.map((item) => (
              <ContactCard data={item} type="consumer" />
            ))}
        </View>
      </ScrollView>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        height={50}
        marginLeft={20}
        color={mainColor}
        text="Crear Contacto"
        onPress={() => Alert.alert("Crear Producto")}
      />
    </>
  );
};

export default Consumers;
