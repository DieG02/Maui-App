import React from "react";
import { View, ScrollView } from "react-native";
import DebtTypeCard from "../../components/common/DebtTypeCard";
import customStyles from "../../styles/customStyles";
import { useNavigation } from "@react-navigation/native";

const { background } = customStyles;


interface Item {
    item?: {
        icon: String
        title: String
        subtitle: String
        value: Number | String
        method: "Tarjeta" | "Efectivo" | String
    }
} 
const DebtTypes = ({ items }: { items?: Item[]}) => {

    return(
        <View style={{
            flex: 1,
            backgroundColor: background,
            paddingTop: 20,
          }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <DebtTypeCard/>
                <DebtTypeCard/>
                <DebtTypeCard/>
                <DebtTypeCard/>
                <DebtTypeCard/>
                <DebtTypeCard/>
                <DebtTypeCard/>
                <DebtTypeCard/>
            </ScrollView>
        </View>
    )
}

export default DebtTypes;
