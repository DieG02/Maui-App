import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../styles/themeStyles';
import Icon from 'react-native-vector-icons/Ionicons';

function BalanceCard({name, price, color, icon, type, state, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.root}>
        <View style={[theme.row]}>
          <View style={theme.row}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: color || '#3784F9',
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={icon} size={30} color="white" />
            </View>
            <View style={theme.column}>
              <Text style={theme.h2}>{name}</Text>
              <Text style={theme.p}>{type}</Text>
            </View>
          </View>
          <View style={[theme.column, {alignItems: 'flex-end'}]}>
            <Text style={theme.h2}>{price}</Text>
            <Text style={theme.p}>{state}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 70,
    backgroundColor: 'white',
  },
});

export default BalanceCard;
