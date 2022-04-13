import React from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import Frame from './Frame';
import BalanceCard from './BalanceCard';
import BlockState from './BlockState';
import Title from './Title';
import theme from '../styles/themeStyles';
import Spacer from '../components/Spacer';
import Modal from "./Modal";
import { balance } from "../helpers/seed";



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
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 30,
          }}
        >
          {balance.map((i) => (
            <Modal
              key={i.id}
              name={i.name}
              price={i.price}
              type={i.type}
              state={i.state}
              onPress={() => alert("Hola")}
              color={i.color}
              icon={i.icon}
            />
          ))}
        </View>
       
      </View>
    </ScrollView>
  );
}
export default TabMonth;
