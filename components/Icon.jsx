import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

function Icon({onPress, children, style}) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={[styles.icons, style]}>{children}</View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  icons: {
    width: 40,
    height: 40,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});

export default Icon;
