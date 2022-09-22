import React from "react";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import ScreenContainer from "../../components/containers/ScreenContainer";

const { mainColor } = globalStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const NotificationsScreen = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <Header
        name="Notificaciones"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color={mainColor} />
          </Icon>
        }
      />
    </ScreenContainer>
  );
};

export default NotificationsScreen;
