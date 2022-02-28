import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Arrow from 'react-native-vector-icons/Ionicons';
import Plus from 'react-native-vector-icons/Feather';
import Bill from 'react-native-vector-icons/FontAwesome5';
import Bank from 'react-native-vector-icons/FontAwesome';

export default function Notifications({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        name="Notificaciones"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
