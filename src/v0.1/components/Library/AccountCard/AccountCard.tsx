import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Down from 'react-native-vector-icons/Ionicons';
import Top from 'react-native-vector-icons/Ionicons';
import customStyles from '../../../styles/customStyles';
import styles from './style';
import CountryFlag from 'react-native-country-flag';
import { IFinancialAccount } from '../../../types/types';

const { item, itemLight, income, incomeLight, expense, expenseLight, orange, orangeLight } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  account: IFinancialAccount;
  left?: number;
  right?: number;
}

const AccountCard = ({ account, left, right }: Props) => {
  const {
    accountName,
    currency: { code, isoCode },
    total_balance,
  } = account;
  return (
    <TouchableOpacity style={styles({ left, right }).wrapper} activeOpacity={0.5}>
      <View style={styles({}).container}>
        <CountryFlag
          isoCode={isoCode}
          size={40}
          style={{
            marginVertical: 5,
            width: 40,
            height: 40,
            borderRadius: 30,
            marginRight: 10,
          }}
        />
        <View style={styles({}).subWrapper}>
          <Text style={styles({}).textValue} numberOfLines={1}>
            {`${code} ${total_balance}`}
          </Text>
        </View>
        <Text style={styles({}).textLabel}>{`${accountName}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccountCard;
