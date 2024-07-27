import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import customStyles from '../../../styles/customStyles';
import styles from './style';

const { textLight } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  left?: number;
  right?: number;
}

const NewBalanceCard = ({ left, right }: Props) => {
  return (
    <TouchableOpacity style={styles({ left, right }).wrapper} activeOpacity={0.5}>
      <View style={styles({}).container}>
        <View style={styles({}).icon}>
          <Feather name='plus' size={35} color={textLight} />
        </View>
        <View style={styles({}).subWrapper}>
          <Text style={styles({}).textValue} numberOfLines={1}>
            {`Add new account`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewBalanceCard;
