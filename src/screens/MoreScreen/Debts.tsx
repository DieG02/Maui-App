import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp } from "@react-navigation/native";
interface Props {
  navigation: NavigationProp<any, any>;
}

const Debts = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <BackHeaderTitle label="Deudas" onPressBack={() => navigation.goBack()} />
    </ScreenContainer>
  );
};

export default Debts;
