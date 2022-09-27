import React from "react";
import { NavigationProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";

interface Props {
  navigation: NavigationProp<any, any>;
}

const NotificationsScreen = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Notificaciones"
        onPressBack={() => navigation.goBack()}
      />
    </ScreenContainer>
  );
};

export default NotificationsScreen;
