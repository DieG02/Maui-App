import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function BlockState({state, value}) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.icon} />
        <View style>
          <Text>{state}</Text>
          <Text>{value}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 170,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'orange',
    marginRight: 10,
  },
});

export default BlockState;
