import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import DebtTypeCard from "../../components/common/DebtTypeCard";
import customStyles from "../../styles/customStyles";
import { useNavigation } from "@react-navigation/native";

const { background } = customStyles;

enum PaymentMethods {
    CASH,
    CARD,
}

interface Item {
    item: {
        id: string;
        icon?: string;
        value: number;
        name: string;
        date: string;
        categoryId: string;
        isPaid: boolean;
        paymentMethod: PaymentMethods;
        ownerId: string;
        expenseDebtIds: any[];
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
                {items?.map(item => (<DebtTypeCard data={item}/>))}
            </ScrollView>
        </View>
    )
}

export default DebtTypes;
