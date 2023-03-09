import { View, FlatList } from "react-native";
import DebtTypeCard from "../../components/common/DebtTypeCard";
import customStyles from "../../styles/customStyles";

const { background } = customStyles;

interface Props {
    paidData?: Payments[]
}

const PaymentTypes = ({ paidData }: Props) => {

    return (
        <View style={{
            flex: 1,
            backgroundColor: background,
            paddingTop: 20,
        }}>
            <FlatList
                data={paidData}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <DebtTypeCard value={item.amount as number}
                        createdAt={item.paidAt as Date}
                        paymentMethod={item.paymentMethod} />
                } />
        </View>
    )
}

export default PaymentTypes;