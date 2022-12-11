import React from "react";
import { NavigationProp } from "@react-navigation/native";
import ScreenContainer from "../../v0.1/components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../v0.1/components/common/HeaderTitle";

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
