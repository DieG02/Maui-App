import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

export default function HomeState({onPress}) {
  const [hide, setHide] = useState(false);

  console.log('Hide ==>', hide);
  return (
    <View
      style={{
        marginHorizontal: 30,
        backgroundColor: '#f9f9f9',
        width: width - 60,
        borderRadius: 20,
        height: 180,
      }}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, color: '#131313'}}>Saldo</Text>
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {hide ? (
              <Icon name="eye-off" size={30} color="#A8CAFE" />
            ) : (
              <Icon name="eye" size={30} color="#A8CAFE" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {hide ? (
            <Text
              style={{
                fontSize: 40,
                color: '#131313',
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 20,
                marginRight: 15,
              }}>
              $****
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 40,
                color: '#131313',
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 20,
                marginRight: 15,
              }}>
              $4000
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: '#3784F9', fontWeight: 'bold'}}>
            Ver más cuentas
          </Text>
          <Icon name="chevron-right" size={25} color="#3784F9" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
