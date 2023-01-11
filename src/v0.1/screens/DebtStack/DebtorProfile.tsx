import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import Button from "../../components/common/Button";
import customStyles from "../../styles/customStyles";
import DebtorItem from "../../components/common/DebtorItem";

interface Props {
    navigation: any
  }
  
  
const DebtorProfile = ({ navigation }: Props) => {
    const percent = 700/2000*100;
    const { mainColor, expense, secondaryColor, orange, textOutline } = customStyles;

    const styles = StyleSheet.create({
        body: {
            flex: 1,
            marginHorizontal: 20,
            paddingBottom: 15,
        },
        cardContainer: {
            backgroundColor: secondaryColor,
            height: 100,
            borderRadius: 10,
            justifyContent: "space-around",
            alignItems: "center",   
            marginHorizontal: 10,
            padding: 15,
        },
        cardLabel: {
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
        },

    });

    return (
        <ScreenContainer>
            <BackHeaderTitle label="Estaban Gonzalez" onPressBack={navigation.goBack}/>
            <View style={styles.body}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardLabel}>
                        <Text>Abonado </Text>
                        <Text style={{ fontWeight: "bold", color: "#191919" }}> 
                            <Text style={{color: expense}}>$700</Text> / $2000
                        </Text>
                    </View>
                    <View style={{
                        width: "100%",
                        backgroundColor: "#EAEAEA",
                        borderRadius: 12,
                        height: 18,
                    }}>
                        <View style={{ 
                            backgroundColor: orange,
                            width: percent <= 10 ? "10%" : percent + "%",
                            position: "absolute",
                            borderRadius: 12,
                            height: "100%",
                            justifyContent: "center"
                        }}>
                        <Text style={{ 
                            paddingRight: 10,
                            textAlign: "right",
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "white",
                            }}>{percent}%</Text>
                        </View>
                        
                    </View>
                </View>

                <Text style={{ marginVertical: 15 }}>Inserte tab bar acá</Text>
                <ScrollView>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                    <DebtorItem/>
                </ScrollView>

                <Button
                    onPress={() => console.log("Abonado!!")}
                    text="Abonar"
                    style={{ backgroundColor: mainColor }}
                />
            </View>
        </ScreenContainer>
    )
}

export default DebtorProfile;