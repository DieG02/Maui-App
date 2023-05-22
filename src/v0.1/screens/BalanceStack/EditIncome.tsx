import React from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import LoadingComponent from "../../components/Library/LoadingComponent";
import useGetIncomeById from "../../services/Incomes/useGetIncomeById";
import EditIncomeForm from "../../components/common/EditIncomeForm";
import { queryClient } from "../../utils/queryClient";

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
      <BackHeaderTitle
        label="Editar Ingreso"
        onPressBack={() => {
          queryClient.removeQueries("IncomeDetail");
          navigation.goBack();
        }}
        hasType
        color={mainColor}
      />
      <EditIncomeForm navigation={navigation} data={data} params={params} />
    </ScreenContainer>
  );
};
export default EditIncome;
