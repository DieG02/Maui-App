import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './navigation/HomeTabs';
import Accounts from './screens/Accounts';
import Notifications from './screens/Notifications';
import IncomeForm from './screens/IncomeForm';
import OutcomeForm from './screens/OutcomeForm';
import AddProduct from './screens/AddProduct';
import TransactionDetail from './screens/TransactionDetail';
import ProductDetail from './screens/ProductDetail';
import MoreScreen from './screens/MoreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="IncomeForm" component={IncomeForm} />
        <Stack.Screen name="OutcomeForm" component={OutcomeForm} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
