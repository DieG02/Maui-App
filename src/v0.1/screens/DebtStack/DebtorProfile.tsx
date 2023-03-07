import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import Button from "../../components/common/Button";
import customStyles from "../../styles/customStyles";
import { useQuery } from "react-query";
import { getExpenseById, getIncomeDebtById } from "../../services/debts";
import { NavigationProp } from "@react-navigation/native";
import DebtTypes from "./DebtTypes";
import RepayModal from "../../components/common/Modals/RepayModal";
import DebtPaidDetail from "./DebtPaidDetail";
import PaymentTypes from "./PaymentTypes";

const Tab = createMaterialTopTabNavigator();

interface Props {
    navigation: NavigationProp<any, any>;
    route: {
        params: {
            name: string,
            expenseId: string,
            incomeId: string
        };
    };
}

const { mainColor, secondaryColor, white } = customStyles;

const DebtorProfile = ({ navigation, route }: Props) => {
    const expenseId = route.params?.expenseId;
    const incomeId = route.params?.incomeId;
    const { data: incomeData } = useQuery(["incomeData", incomeId], () => getIncomeDebtById(incomeId))
    const { data } = useQuery(["expense", expenseId], () => getExpenseById(expenseId))

    const DebtComponent = () => <DebtTypes data={incomeData?.incomes || data?.expenses} />

    const PayComponent = () => <PaymentTypes paidData={data?.payments} />

    return (
        <ScreenContainer>
            <BackHeaderTitle label={route.params.name} onPressBack={navigation.goBack} />
            <View style={{
                flex: 1,
                marginHorizontal: 20,
                paddingBottom: 20,
            }}>
                <DebtPaidDetail amountPaid={(incomeData || data)?.amountPaid}
                    totalAmount={(incomeData || data)?.totalAmount} />
                <Tab.Navigator
                    style={{ backgroundColor: white }}
                    screenOptions={{
                        tabBarStyle: {
                            elevation: 0,
                            marginHorizontal: 0,
                            backgroundColor: secondaryColor,
                            borderRadius: 15,
                        },
                        tabBarPressColor: white,
                        tabBarActiveTintColor: white,
                        tabBarInactiveTintColor: mainColor,
                        tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
                        tabBarIndicatorStyle: {
                            backgroundColor: mainColor,
                            height: 45,
                            borderRadius: 15,
                        },
                        tabBarItemStyle: {
                            borderRadius: 15,
                            height: 45,
                        },
                    }}>
                    <Tab.Screen name="Deuda" component={DebtComponent} />
                    <Tab.Screen name="Abonado" component={PayComponent} />
                </Tab.Navigator>
                <Button
                    onPress={() => { }}
                    text="Abonar"
                    style={{ backgroundColor: mainColor }}
                />
                {/* <RepayModal
                    isModalVisible={showModal}
                    setIsModalVisible={toggleModal}
                    value={value}
                    setValue={setValue}
                    comments={comments}
                    setComments={setComments}
                    date={date}
                    setDate={setDate}
                /> */}
            </View>
        </ScreenContainer>
    )
}

export default DebtorProfile;