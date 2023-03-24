import { View, FlatList } from "react-native";
import DebtTypeCard from "../../components/common/DebtTypeCard";
import customStyles from "../../styles/customStyles";

const { background } = customStyles;

interface Props {
    data?: IncomeOrExpense[]
}

const DebtTypes = ({ data }: Props) => {

    return (
        <View style={{
            flex: 1,
            backgroundColor: background,
            paddingTop: 20,
        }}>
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <DebtTypeCard name={item.name}
                        icon={item?.url}
                        value={item.value}
                        createdAt={item.createdAt} />
                } />
        </View>
    )
}

export default DebtTypes;