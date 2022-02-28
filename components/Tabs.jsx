import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

function DiaScreen() {
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      <Text>Home!</Text>
      <Text>Home!</Text>
      <Text>Home!</Text>
      <Text>Home!</Text>
      <Text>Home!</Text>
      <View style={{backgroundColor: 'red', height: 600}} />
      <Text>Home!</Text>
      <Text>Home!</Text>
    </ScrollView>
  );
}

function SemanaScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      style={{backgroundColor: '#f9f9f9'}}
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          marginHorizontal: 20,
          backgroundColor: '#f9f9f9',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#3784F9',
        tabBarLabelStyle: {fontSize: 13, fontWeight: 'bold'},
        tabBarIndicatorStyle: {
          backgroundColor: '#3784F9',
          height: 60,
          borderRadius: 15,
        },
        tabBarItemStyle: {marginHorizontal: 1, borderRadius: 15, height: 60},
      }}>
      <Tab.Screen name="Dia" component={DiaScreen} />
      <Tab.Screen name="Semana" component={SemanaScreen} />
      <Tab.Screen name="Mes" component={SemanaScreen} />
      <Tab.Screen name="Año" component={SemanaScreen} />
    </Tab.Navigator>
  );
}
