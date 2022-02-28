import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function ProductCard({
  onPress,
  image,
  price,
  description,
  stock,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#F9F9F9',
        height: 260,
        width: '47%',
        borderRadius: 20,
        marginTop: 20,
      }}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <Image
          resizeMode="contain"
          source={{
            uri: image,
          }}
          style={{width: '100%', height: 100, alignSelf: 'center'}}
        />
        <Text
          style={{
            color: '#3784F9',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 8,
            marginBottom: 4,
          }}>
          {price}
        </Text>
        <Text style={{color: '#302F3C', height: 60}}>{description}</Text>
        <Text
          style={{
            color: '#3784F9',
            fontWeight: 'bold',
            marginVertical: 5,
          }}>
          Stock: {stock}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
