import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import Button from "../../components/common/Button";
import customStyles from "../../styles/customStyles";
import { useQuery } from "react-query";
import { getExpenseById, getIncomeDebtById } from "../../services/debts";
import { NavigationProp } from "@react-navigation/native";
import DebtTypes from "./DebtTypes";
import RepayModal from "../../components/common/Modals/RepayModal";

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

const { mainColor, expense, secondaryColor, orange } = customStyles;

const DebtorProfile = ({ navigation, route }: Props) => {
    const [paidValue, setPaidValue] = useState(0);
    const expenseId = route.params?.expenseId;
    const incomeId = route.params?.incomeId;
    const { data: incomeData } = useQuery(["incomeData", incomeId], () => getIncomeDebtById(incomeId))
    const { data } = useQuery(["expense", expenseId], () => getExpenseById(expenseId))

    useEffect(() => {
        const paid = (incomeData || data)?.amountPaid
        const total = (incomeData || data)?.totalAmount
        if (paid && total) setPaidValue(Number(((paid / total) * 100).toFixed(2)))
    }, [incomeData, data])

    const DebtComponent = () => <DebtTypes data={incomeData?.incomes || data?.expenses} />

    const PayComponent = () => <DebtTypes paidData={data?.payments} />

    const styles = StyleSheet.create({
        body: {
            flex: 1,
            marginHorizontal: 20,
            paddingBottom: 20,
        },
        cardContainer: {
            backgroundColor: secondaryColor,
            height: 100,
            borderRadius: 10,
            justifyContent: "space-around",
            alignItems: "center",
            marginHorizontal: 10,
            padding: 15,
            marginBottom: 20,
        },
        cardLabel: {
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
        },
        progressBarBase: {
            width: "100%",
            backgroundColor: "#EAEAEA",
            borderRadius: 12,
            height: 18,
        },
        progressBar: {
            backgroundColor: orange,
            width: paidValue <= 10 ? "10%" : paidValue + "%",
            position: "absolute",
            borderRadius: 10,
            height: "100%",
            justifyContent: "center"
        },
        processBarLabel: {
            paddingRight: 10,
            textAlign: "right",
            fontSize: 10,
            fontWeight: "bold",
            color: "white",
        }
    });

    return (
        <ScreenContainer>
            <BackHeaderTitle label={route.params.name} onPressBack={navigation.goBack} />
            <View style={styles.body}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardLabel}>
                        <Text>Abonado</Text>
                        <Text style={{ fontWeight: "bold", color: "#191919" }}>
                            <Text style={{ color: expense }}>
                                ${(incomeData || data)?.amountPaid}
                            </Text> / ${(incomeData || data)?.totalAmount}
                        </Text>
                    </View>
                    <View style={styles.progressBarBase}>
                        <View style={styles.progressBar}>
                            <Text style={styles.processBarLabel}>
                                {paidValue}%
                            </Text>
                        </View>
                    </View>
                </View>
                <Tab.Navigator
                    style={{ backgroundColor: "#fff" }}
                    screenOptions={{
                        tabBarStyle: {
                            elevation: 0,
                            marginHorizontal: 0,
                            backgroundColor: "#f8f8f8",
                            borderRadius: 15,
                        },
                        tabBarPressColor: "white",
                        tabBarActiveTintColor: "white",
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