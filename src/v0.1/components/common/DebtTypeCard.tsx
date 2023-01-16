import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Item {
    item?: {
        icon: String
        title: String
        subtitle: String
        value: Number | String
        method: "Tarjeta" | "Efectivo" | String
    }
}

const DebtTypeCard = ({ item }: Item) => {
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

    const example = {
        icon: "IMG",
        title: "Compra de materiales",
        subtitle: "06 de Julio",
        value: "-$300",
        method: "Tarjeta" 
    }
    item = item ? item : example;

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Text>{item.icon}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.mainContent}>{item.title}</Text>
                <Text style={styles.subContent}>{item.subtitle}</Text>
            </View>
            <View style={styles.payment}>
                <Text style={styles.mainContent}>{item.value}</Text>
                <Text style={styles.subContent}>{item.method}</Text>
            </View>
        </View>
    )
}

export default DebtTypeCard;