import React from 'react';
import {View, Dimensions, Text} from 'react-native';

import theme from '../styles/themeStyles';

const {width} = Dimensions.get('window');
const ancho = (width - 120) / 2;

function StateCard({color, state, value, icon, left, right}) {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 180,
        width: ancho,
        borderRadius: 25,
        // elevation: 0.2,
        marginLeft: left,
        marginRight: right,
      }}>
      <View
        style={[
          {
            marginVertical: 10,
            marginHorizontal: 20,
          },
          theme.column,
        ]}>
        <View
          style={{
            width: 60,
            height: 60,
            marginTop: 10,
            marginBottom: 10,
          }}>
          {icon}
        </View>
        <Text style={{color: '#1A1A1A', fontSize: 18, marginVertical: 8}}>
          {state}
        </Text>
        <Text
          style={{
            color: '#1A1A1A',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default StateCard;
