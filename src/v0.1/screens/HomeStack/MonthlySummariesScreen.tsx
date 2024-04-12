import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import { NavigationProp } from '@react-navigation/native';
import customStyles from '../../styles/customStyles';
import Spacer from '../../components/common/Spacer';

interface Props {
  navigation: NavigationProp<any, any>;
}

type TabProp = {
  id: number;
  month: string;
  data: any;
};

const { textBlack } = customStyles;

const balances: TabProp[] = [
  {
    id: 0,
    month: 'Agosto 2023',
    data: { previous: '1000', incomes: '1000', expense: '0', total: '2000' },
  },
  {
    id: 1,
    month: 'Septiembre 2023',
    data: { previous: '1000', incomes: '1000', expense: '0', total: '2000' },
  },
  {
    id: 2,
    month: 'Octubre 2023',
    data: { previous: '1000', incomes: '1000', expense: '0', total: '2000' },
  },
  {
    id: 3,
    month: 'Noviembre 2023',
    data: { previous: '1000', incomes: '1000', expense: '0', total: '2000' },
  },
];

const MonthlySummariesScreen = ({ navigation }: Props) => {
  const [tabId, setTabId] = useState<number[]>([]);

  const handlePress = (value: number) => {
    if (!tabId.includes(value)) {
      setTabId([...tabId, value]);
    } else {
      setTabId(tabId.filter(item => item !== value));
    }
  };

  const Tab = ({ id, month, data }: TabProp) => {
    return (
      <View style={{ marginBottom: 20, marginHorizontal: 30 }}>
        <TouchableOpacity
          onPress={() => handlePress(id)}
          style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 20, paddingVertical: 16 }}
        >
          <Text style={{ color: textBlack, fontSize: 16 }}>{month}</Text>
        </TouchableOpacity>
        {tabId.includes(id) && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: '#F8F8F8' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontWeight: '300', fontSize: 14 }}>Saldo Anterior</Text>
              <Text style={{ color: textBlack, fontWeight: '300', fontSize: 14 }}>${data.previous}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontSize: 16 }}>Ingresos</Text>
              <Text style={{ color: '#48BB8B', fontSize: 16 }}>${data.incomes}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontSize: 16 }}>Egresos</Text>
              <Text style={{ color: textBlack, fontSize: 16 }}>${data.expense}</Text>
            </View>
            <View style={{ width: '100%', borderTopColor: '#F8F8F8', borderTopWidth: 2, marginVertical: 7 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: textBlack, fontSize: 16 }}>Total</Text>
              <Text style={{ color: textBlack, fontSize: 16 }}>${data.total}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={'Balance'}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <Spacer height={30} />
      <FlatList
        data={balances}
        renderItem={({ item }) => <Tab id={item.id} month={item.month} data={item.data} />}
        keyExtractor={item => item.id.toString()}
      />
    </ScreenContainer>
  );
};

export default MonthlySummariesScreen;
