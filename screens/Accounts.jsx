import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Arrow from 'react-native-vector-icons/Ionicons';
import Plus from 'react-native-vector-icons/Feather';
import Bill from 'react-native-vector-icons/FontAwesome5';
import Bank from 'react-native-vector-icons/FontAwesome';

export default function Accounts({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <Header
        name="Cuentas"
        color="#f8f8f8"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }>
        <Icon onPress={() => alert('Agregar Cuenta')}>
          <Plus name="plus" size={30} color="#3784F9" />
        </Icon>
      </Header>
      <View style={{marginHorizontal: 30, marginTop: 10}}>
        <View
          style={{
            backgroundColor: 'white',
            height: 120,
            marginBottom: 20,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: 'center',
              height: '100%',
            }}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#E6EFF8',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Bill name="money-bill" size={35} color="#3784F9" />
            </View>
          </View>
          <View>
            <Text style={{fontSize: 18, color: '#131313'}}>Saldo</Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#131313'}}>
              $3000
            </Text>
            <Text style={{color: '#131313'}}>Caja</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 120,
            marginBottom: 20,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: 'center',
              height: '100%',
            }}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#E6EFF8',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Bank name="bank" size={35} color="#3784F9" />
            </View>
          </View>
          <View>
            <Text style={{fontSize: 18, color: '#131313'}}>Saldo</Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#131313'}}>
              $1000
            </Text>
            <Text style={{color: '#131313'}}>Banco</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
