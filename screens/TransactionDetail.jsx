import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Arrow from 'react-native-vector-icons/Ionicons';
import Dollar from 'react-native-vector-icons/FontAwesome';
import Calendar from 'react-native-vector-icons/Entypo';
import Tag from 'react-native-vector-icons/AntDesign';
import Costumer from 'react-native-vector-icons/FontAwesome';
import Wallet from 'react-native-vector-icons/Entypo';
import Money from 'react-native-vector-icons/FontAwesome5';
import Description from 'react-native-vector-icons/FontAwesome';
import InputForm from '../components/InputForm';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function TransactionDetail({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <Header
        name="Detalle"
        color="#fafafa"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }
      />
      <View style={{marginTop: 10}}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 30,
            borderRadius: 20,
            paddingVertical: 20,
          }}>
          <View style={{marginHorizontal: 30, marginTop: 10, marginBottom: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#131313'}}>
              Monto
            </Text>
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Dollar
                name="dollar"
                size={30}
                color="#3784F9"
                style={{marginRight: 20}}
              />
              <Text style={{fontSize: 15, color: '#131313'}}>$1,000.00</Text>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#131313'}}>
              Fecha
            </Text>
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Calendar
                name="calendar"
                size={30}
                color="#3784F9"
                style={{marginRight: 20}}
              />
              <Text style={{fontSize: 15, color: '#131313'}}>
                Hoy, 30 de agosto
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#131313'}}>
              Descripcion
            </Text>
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Description
                name="file-text"
                size={30}
                color="#3784F9"
                style={{marginRight: 20}}
              />
              <Text style={{fontSize: 15, color: '#131313'}}>
                Pintura Alba 20L lavable
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#131313'}}>
              Categoria
            </Text>
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Tag
                name="tag"
                size={30}
                color="#3784F9"
                style={{marginRight: 20}}
              />
              <Text style={{fontSize: 15, color: '#131313'}}>Pinturas</Text>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#131313'}}>
              Forma de Pago
            </Text>
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Money
                name="money-bill"
                size={30}
                color="#3784F9"
                style={{marginRight: 20}}
              />
              <Text style={{fontSize: 15, color: '#131313'}}>Efectivo</Text>
            </View>
          </View>
          <View style={{marginHorizontal: 30, marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#131313'}}>
              Cuenta
            </Text>
            <View
              style={{
                height: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Wallet
                name="wallet"
                size={30}
                color="#3784F9"
                style={{marginRight: 20}}
              />
              <Text style={{fontSize: 15, color: '#131313'}}>Caja</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
