import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';

interface Props extends React.ComponentProps<typeof SafeAreaView> {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

const { background } = customStyles;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: background,
  },
});

const ScreenContainer = ({ children, style }: Props) => {
  return <SafeAreaView style={[styles.root, style]}>{children}</SafeAreaView>;
};

export default ScreenContainer;
