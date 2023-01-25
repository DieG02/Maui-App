import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Button from "../../components/common/Button";
import customStyles from "../../styles/customStyles";
import { NavigationProp } from "@react-navigation/native";

import DebtTypes from "./DebtTypes";
import RepayModal from "../../components/common/Modals/RepayModal";

interface Props {
    navigation: NavigationProp<any, any>
}

const { mainColor, expense, secondaryColor, orange } = customStyles;
const Tab = createMaterialTopTabNavigator();

const DebtorProfile = ({ navigation }: Props) => {
    const percent = 700/2000*100;
    const [showModal, setShowModal] = useState(false);
    const toogleModal = (): void => setShowModal(!showModal);
    const [value, setValue] = useState("");
    const [comments, setComments] = useState("");
    const [date, setDate] = useState("");


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
            width: percent <= 10 ? "10%" : percent + "%",
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
            <BackHeaderTitle label="Estaban Gonzalez" onPresssBack={navigation.goBack}/>
            <View style={styles.body}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardLabel}>
                        <Text>Abonado </Text>
                        <Text style={{ fontWeight: "bold", color: "#191919" }}> 
                            <Text style={{color: expense}}>$700</Text> / $2000
                        </Text>
                    </View>
                    <View style={styles.progressBarBase}>
                        <View style={styles.progressBar}>
                            <Text style={styles.processBarLabel}>
                                {percent}%
                            </Text>
                        </View>
                    </View>
                </View>

                <Tab.Navigator
                    style={{ backgroundColor: "#fff" }}
                    initialRouteName="Por Cobrar"
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
                    }}
                >
                    <Tab.Screen name="Deuda" component={DebtTypes} />
                    <Tab.Screen name="Abonado" component={DebtTypes} />
                </Tab.Navigator>
                <Button
                    onPress={() => setShowModal(!showModal)}
                    text="Abonar"
                    style={{ backgroundColor: mainColor }}
                />
                <RepayModal 
                    isModalVisible={showModal}
                    setIsModalVisible={toogleModal}
                    value={value}
                    setValue={setValue}
                    comments={comments}
                    setComments={setComments}
                    date={date}
                    setDate={setDate}
                />
            </View>
        </ScreenContainer>
    )
}

export default DebtorProfile;