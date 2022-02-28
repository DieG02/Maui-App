import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function Header({name, children, icon, color}) {
  const styles = StyleSheet.create({
    root: {
      backgroundColor: color || 'white',
      height: 60,
      justifyContent: 'center',
    },
    container: {
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    containerIcons: {
      display: 'flex',
      flexDirection: 'row',
    },
    icons: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 10,
      color: '#1A1A1A',
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {icon}
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.containerIcons}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  icons: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#1A1A1A',
  },
});

export default Header;
