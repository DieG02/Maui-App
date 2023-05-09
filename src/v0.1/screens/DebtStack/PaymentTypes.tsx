import { View, FlatList } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtsCard from "../../components/Library/DebtsCard/DebtsCard";

const { background } = customStyles;

interface Props {
    paidData?: Payments[]
}

const PaymentTypes = ({ paidData }: Props) => {

    console.log('paidDta:', paidData);

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
                    />
                } />
        </View>
    )
}

export default PaymentTypes;