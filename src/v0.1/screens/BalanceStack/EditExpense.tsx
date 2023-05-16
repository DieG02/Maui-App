import { StatusBar } from "react-native"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import "moment-timezone"
import ScreenContainer from "../../components/containers/ScreenContainer"
import { BackHeaderTitle } from "../../components/common/HeaderTitle"
import customStyles from "../../styles/customStyles"
import LoadingComponent from "../../components/Library/LoadingComponent"
import useGetExpense from "../../services/Expense/useGetExpById"
import ExpenseDetail from "./ExpenseDetail"
import { queryClient } from "../../utils/queryClient"

const { mainColor } = customStyles
interface Props {
  navigation: NavigationProp<any, any>
  route: RouteProp<any, any>
}

const EditExpense = ({ navigation, route }: Props) => {
  const { params } = route
  const { data, isLoading } = useGetExpense(params?.expense.id)

  if (isLoading) return <LoadingComponent color={mainColor} />

  return (
    <ScreenContainer>
      <StatusBar backgroundColor="#E8F1FD" />
      <BackHeaderTitle label="Editar Egreso"
        onPressBack={() => {
          queryClient.removeQueries('expenseDetail')
          navigation.goBack()
        }}
        headerStyle={{ backgroundColor: "#E8F1FD" }}
      />
      <ExpenseDetail
        navigation={navigation}
        data={data!}
        params={params}
      />
    </ScreenContainer>
  )
}

export default EditExpense;
