import { NavigationProp, RouteProp } from "@react-navigation/native";
import "moment-timezone";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import LoadingComponent from "../../components/Library/LoadingComponent";
import useGetExpense from "../../services/Expense/useGetExpById";
import ExpenseDetail from "./ExpenseDetail";

const { mainColor, background2 } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const EditExpense = ({ navigation, route }: Props) => {
  const { params } = route;
  const { data, isLoading } = useGetExpense(params?.expense.id);

  if (isLoading) return <LoadingComponent color={mainColor} />;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Editar Gasto"
        onPressBack={() => navigation.goBack()}
        headerStyle={{ backgroundColor: background2 }}
      />
      <ExpenseDetail navigation={navigation} data={data!} params={params} />
    </ScreenContainer>
  );
};

export default EditExpense;
