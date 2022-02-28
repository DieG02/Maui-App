import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function InputForm({
  onPress,
  children,
  name,
  bottom,
  keyboardType,
  placeholder,
  value,
  setValue,
}) {
  //   const [value, setValue] = useState('');

  return (
    <View style={{marginTop: 20, marginBottom: bottom}}>
      <Text>{name}</Text>
      <View
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
          <TextInput
            style={{
              width: '80%',
            }}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
          {/* <Icon name="chevron-small-right" size={40} color="#3784F9" /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
