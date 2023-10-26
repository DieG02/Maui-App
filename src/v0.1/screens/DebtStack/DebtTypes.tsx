import { View, FlatList } from 'react-native';
import customStyles from '../../styles/customStyles';
import DebtsCard from '../../components/Library/DebtsCard/DebtsCard';
import { useNavigation } from '@react-navigation/native';

const { background } = customStyles;

interface Props {
  data?: any[];
  type: 'debt' | 'payment';
}

const DebtTypes = ({ data, type }: Props) => {
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
        renderItem={({ item }) =>
          type === 'debt' ? (
            <DebtsCard
              data={item?.transaction[0]}
              type={type}
              onPress={() => navigation.navigate('DebtDetail', { id: item?.transaction[0].id, type: type })}
            />
          ) : (
            <DebtsCard
              data={item}
              type={type}
              onPress={() => navigation.navigate('DebtDetail', { id: item?.id, type: type })}
            />
          )
        }
      />
    </View>
  );
};

export default DebtTypes;
