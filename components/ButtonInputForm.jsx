import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function ButtonInput({text, onPress, children, name, bottom}) {
  return (
    <View style={{marginTop: 20, marginBottom: bottom}}>
      <Text>{name}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            height: 50,
          }}>
          {children}
          <Text>{text}</Text>
          <Icon name="chevron-small-right" size={40} color="#3784F9" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
