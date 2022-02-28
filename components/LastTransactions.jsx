import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BalanceCard from './BalanceCard';
import {balance} from '../helpers/seed';

function LastTransactions({navigation}) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'white',
            paddingBottom: 10,
          }}>
          {balance.map(i => (
            <BalanceCard
              key={i.id}
              name={i.name}
              price={i.price}
              type={i.type}
              state={i.state}
              color={i.color}
              icon={i.icon}
              onPress={() => navigation.navigate('TransactionDetail')}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {backgroundColor: 'white'},
  container: {
    marginHorizontal: 30,
  },
});
export default LastTransactions;
