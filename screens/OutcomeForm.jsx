import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Arrow from 'react-native-vector-icons/Ionicons';
import Fab from '../components/Fab';

const {width} = Dimensions.get('window');

export default function OutcomeForm({navigation}) {
  const [state, setState] = useState(0);
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <Header
        name="Nuevo Egreso"
        color="#f8f8f8"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }></Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}>
        <View style={{}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setState(0)}
              style={{
                backgroundColor: state == 0 ? '#3784F9' : '#E6EFF8',
                width: (width - 100) / 2,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: state == 0 ? 'white' : '#3784F9',
                  fontWeight: 'bold',
                }}>
                Pagado
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setState(1)}
              style={{
                backgroundColor: state == 1 ? '#3784F9' : '#E6EFF8',
                width: (width - 100) / 2,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: state == 1 ? 'white' : '#3784F9',
                  fontWeight: 'bold',
                }}>
                Deuda
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: '#E6EFF8',
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#3784F9',
                fontWeight: 'bold',
              }}>
              Seleccionar Productos
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              height: 50,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <TextInput
              style={{
                marginHorizontal: 30,
              }}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              placeholderTextColor="#3784F9"
              placeholder="Ingrese el monto"
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              height: 50,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <TextInput
              style={{
                marginHorizontal: 30,
              }}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              placeholderTextColor="#3784F9"
              placeholder="Concepto"
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#3784F9',
                marginHorizontal: 30,
              }}>
              Fecha
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#3784F9',
                marginHorizontal: 30,
              }}>
              Clientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#3784F9',
                marginHorizontal: 30,
              }}>
              Categoria
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#3784F9',
                marginHorizontal: 30,
              }}>
              Cuentas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 10,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#3784F9',
                marginHorizontal: 30,
              }}>
              Forma de pago
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        marginLeft={20}
        color="#FD6363"
        text="Guardar"
        onPress={() => alert('Crear Producto')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
