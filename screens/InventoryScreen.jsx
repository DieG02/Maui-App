import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import Plus from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Search from 'react-native-vector-icons/Feather';
import More from 'react-native-vector-icons/Feather';
import ProductCard from '../components/ProductCard';
import Fab from '../components/Fab';
import {products} from '../helpers/seed';

const statusBarStyle = 'dark-content';

const {width} = Dimensions.get('window');

function InventoryScreen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <Header name="Productos">
        <Icon onPress={() => alert('Search')}>
          <Search name="search" size={25} color="#302F3C" />
        </Icon>
        <Icon onPress={() => alert('Search')}>
          <More name="more-vertical" size={25} color="#302F3C" />
        </Icon>
      </Header>
      <View>
        <View style={styles.container}>
          <Icon
            onPress={() => alert('Crear categoria')}
            style={{marginRight: 10}}>
            <Plus name="pluscircle" size={40} color="#5196FE" />
          </Icon>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <View style={styles.fill}>
                <Text style={styles.text}>Todos</Text>
              </View>
              <View style={styles.out}>
                <Text style={styles.text1}>Mesas</Text>
              </View>
              <View style={styles.out}>
                <Text style={styles.text1}>Escritorios</Text>
              </View>
              <View style={styles.out}>
                <Text style={styles.text1}>Estantes</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 30,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 80,
          }}>
          {products.map(i => (
            <ProductCard
              onPress={() => navigation.navigate('ProductDetail')}
              key={i.id}
              image={i.image}
              price={i.price}
              description={i.description}
              stock={i.stock}
            />
          ))}
        </View>
      </ScrollView>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        marginLeft={20}
        color="#3784F9"
        text="Crear Producto"
        onPress={() => navigation.navigate('AddProduct')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    backgroundColor: '#3784F9',
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 10,
    height: 40,
  },
  out: {
    backgroundColor: '#E6EFF8',
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 10,
    height: 40,
  },
  text: {
    marginHorizontal: 20,
    fontSize: 18,
    color: 'white',
  },
  text1: {
    marginHorizontal: 20,
    fontSize: 18,
    color: '#3784F9',
    fontWeight: '500',
  },
  container: {
    marginLeft: 10,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default InventoryScreen;
