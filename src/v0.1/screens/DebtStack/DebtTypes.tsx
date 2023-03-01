import { View, FlatList } from "react-native";
import DebtTypeCard from "../../components/common/DebtTypeCard";
import customStyles from "../../styles/customStyles";

const { background } = customStyles;

interface Props {
    data?: IncomeOrExpense[]
    paidData?: Payments[]
}

const DebtTypes = ({ data, paidData }: Props) => {

    return (
        <View style={{
            flex: 1,
            backgroundColor: background,
            paddingTop: 20,
        }}>
            {
                data ?
                    <FlatList data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <DebtTypeCard name={item.name}
                                value={item.value}
                                createdAt={item.createdAt} />
                        } /> :
                    <FlatList
                        data={paidData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <DebtTypeCard value={item.amount}
                                createdAt={item.paidAt}
                                paymentMethod={item.paymentMethod} />
                        } />
            }

        </View>
    )
}

export default DebtTypes;