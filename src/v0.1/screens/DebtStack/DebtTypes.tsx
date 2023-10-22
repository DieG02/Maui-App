import { View, FlatList } from 'react-native';
import customStyles from '../../styles/customStyles';
import DebtsCard from '../../components/Library/DebtsCard/DebtsCard';
import { useNavigation } from '@react-navigation/native';

const { background } = customStyles;

interface Props {
  data?: any[];
}

const DebtTypes = ({ data }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
        paddingVertical: 20,
        alignItems: 'flex-end',
      }}
    >
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DebtsCard
            data={item.transaction[0]}
            type='debt'
            onPress={() => navigation.navigate('DebtDetail', { item: item.transaction[0].id, type: 'debt' })}
          />
        )}
      />
    </View>
  );
};

export default DebtTypes;
