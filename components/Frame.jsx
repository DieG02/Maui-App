import React from 'react';
import {Text, ScrollView, StyleSheet, View, Dimensions} from 'react-native';

import theme from '../styles/themeStyles';

const {width} = Dimensions.get('window');

function Frame({children, style}) {
  return (
    <View>
      <ScrollView
        horizontal
        style={[styles.container, style]}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={0.5}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Frame;
