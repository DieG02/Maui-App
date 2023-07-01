import { View, FlatList } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtsCard from "../../components/Library/DebtsCard/DebtsCard";
import { useNavigation } from "@react-navigation/native";

const { background } = customStyles;

interface Props {
    paidData?: Payments[];
}

const PaymentTypes = ({ paidData }: Props) => {
    const navigation = useNavigation<any>();

    return (
        <View style={{
            flex: 1,
            backgroundColor: background,
            paddingVertical: 20,
            alignItems: "flex-end"
        }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={paidData}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <DebtsCard
                        data={item}
                        type="payment"
                        onPress={() => navigation.navigate("DebtDetail", { item, type: 'payment' })}
                    />
                } />
        </View>
    )
}

export default PaymentTypes;