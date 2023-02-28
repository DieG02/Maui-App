import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import 'moment/locale/es';

enum PaymentMethods {
    CASH,
    CARD,
}

interface Item {
    data: {
        id: string;
        icon?: string;
        value: number;
        name: string;
        date: string;
        createdAt: string;
        categoryId: string;
        isPaid: boolean;
        paymentMethod: PaymentMethods;
        ownerId: string;
        expenseDebtIds: any[];
    }
} 

const DebtTypeCard = ({ data }: Item) => {
    moment.locale("es");
    const formattedDate = moment(data.createdAt).format('DD [de] MMMM');
    const methods: any = {
        "CASH": "Efectivo",
        "CARD": "Tarjeta"
    }
    
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 5,
            marginBottom: 15,
        },
        icon: {
            minWidth: 50,
            minHeight: 50,
            borderRadius: 25,
            backgroundColor: "#F8F8F8",
            justifyContent: "center",
            alignItems: "center",
        },
        content: {
            flex: 1,
            paddingHorizontal: 10,
        },
        mainContent: {
            color: "#191919",
            fontWeight: "bold"
        },
        subContent: {
            color: "#BDC0C3",
        },
        payment: {
            width: "20%",
            alignItems: "flex-end",
        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Text>{data?.icon}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.mainContent}>{data.name}</Text>
                <Text style={styles.subContent}>{formattedDate}</Text>
            </View>
            <View style={styles.payment}>
                <Text style={styles.mainContent}>${data.value}</Text>
                <Text style={styles.subContent}>{methods[data.paymentMethod]}</Text>
            </View>
        </View>
    )
}

export default DebtTypeCard;