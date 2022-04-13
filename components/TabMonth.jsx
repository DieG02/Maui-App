import React from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import Frame from './Frame';
import BalanceCard from './BalanceCard';
import BlockState from './BlockState';
import Title from './Title';
import theme from '../styles/themeStyles';
import Spacer from '../components/Spacer';

const {width} = Dimensions.get('window');

function TabMonth() {
  return (
    <ScrollView
      vertical
      style={{backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={{marginVertical: 20, backgroundColor: 'white'}}>
        <Title title="Mes" />
        <Spacer height={20} />
        <View style={{marginHorizontal: 30}}>
          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />
          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />

          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />
          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />
          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />
          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />
          <BalanceCard
            name="Jorge"
            price="$1230"
            type="Venta"
            date="14/6"
            onLongPress={() => alert('Hola')}
            delayLongPress={100}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default TabMonth;
