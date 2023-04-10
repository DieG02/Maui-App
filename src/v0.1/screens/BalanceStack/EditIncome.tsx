import React from "react";
import { StatusBar } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import "moment-timezone";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import LoadingComponent from "../../components/Library/LoadingComponent";
import useGetIncomeById from "../../services/Incomes/useGetIncomeById";
import EditIncomeForm from "../../components/common/EditIncomeForm";

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const EditIncome = ({ navigation, route }: Props) => {

  const { params } = route;
  const { data, isLoading } = useGetIncomeById(params?.id);

  if (isLoading) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={mainColor} />
      <BackHeaderTitle
        label="Editar Ingreso"
        onPressBack={() => navigation.goBack()}
        hasType
        color={mainColor}
      />
      <EditIncomeForm
        navigation={navigation}
        data={data}
        params={params}
      />
    </ScreenContainer>
  );
};
export default EditIncome;