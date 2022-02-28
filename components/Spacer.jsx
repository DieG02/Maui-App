import React from 'react';
import {View, StyleSheet} from 'react-native';

function Spacer({height}) {
  const styles = StyleSheet.create({
    root: {
      height: height || 40,
    },
  });
  return <View style={styles.root} />;
}

export default Spacer;
