import { View, FlatList } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtsCard from "../../components/Library/DebtsCard/DebtsCard";
import { useNavigation } from "@react-navigation/native";

const { background } = customStyles;

interface Props {
    data?: IncomeOrExpense[];
}

const DebtTypes = ({ data }: Props) => {
    const navigation = useNavigation<any>();

    return (
        <View style={{
            flex: 1,
            backgroundColor: background,
            paddingVertical: 20,
            alignItems: "flex-end"
        }}>
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <DebtsCard
                        data={item}
                        type="debt"
                        onPress={() => navigation.navigate("DebtDetail", { item, type: 'debt' })}
                    />
                } />
        </View>
    )
}

export default DebtTypes;