import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function StateBadge({state, value, style}) {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.p}>{state}</Text>
      <Text style={[styles.value, style]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 110,
    borderRadius: 10,
    alignItems: 'center',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E6EFF8',
  },
  p: {
    color: '#302F3C',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  value: {
    color: '#2690FD',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default StateBadge;
