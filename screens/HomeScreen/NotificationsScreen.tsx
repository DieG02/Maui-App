import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any, any>;
}

const NotificationsScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        name="Notificaciones"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
