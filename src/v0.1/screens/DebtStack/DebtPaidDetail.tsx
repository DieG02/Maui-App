import { View, Text, StyleSheet } from 'react-native'
import customStyles from '../../styles/customStyles'
import { useMemo } from 'react'

interface Props {
    amountPaid?: number
    totalAmount?: number
}

const { expense, secondaryColor, orange, textBlack } = customStyles;

const styles = StyleSheet.create({
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
    processBarLabel: {
        paddingRight: 10,
        textAlign: "right",
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
    }
})

const paidStyles = (paidValue: number) => StyleSheet.create({
    progressBar: {
        backgroundColor: orange,
        width: paidValue <= 10 ? "10%" : paidValue + "%",
        position: "absolute",
        borderRadius: 10,
        height: "100%",
        justifyContent: "center"
    },
})

export default function DebtPaidDetail({ amountPaid, totalAmount }: Props) {
    const paidValue = useMemo(() => amountPaid && totalAmount ?
        Number(((amountPaid / totalAmount) * 100).toFixed(2)) : 0
        , [amountPaid, totalAmount])

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardLabel}>
                <Text>Abonado</Text>
                <Text style={{ fontWeight: "bold", color: textBlack }}>
                    <Text style={{ color: expense }}>
                        ${amountPaid}
                    </Text> / ${totalAmount}
                </Text>
            </View>
            <View style={styles.progressBarBase}>
                <View style={paidStyles(paidValue).progressBar}>
                    <Text style={styles.processBarLabel}>
                        {paidValue}%
                    </Text>
                </View>
            </View>
        </View>
    )
}