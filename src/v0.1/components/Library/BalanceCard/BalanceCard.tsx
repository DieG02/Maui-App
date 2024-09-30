import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { IFinancialAccount } from '../../../types/types';
import styles from './style';

interface Props {
  account: IFinancialAccount;
  left?: number;
  right?: number;
  onPress: () => void;
  selected: boolean;
}

const AccountCard = ({ account, left, right, onPress, selected }: Props) => {
  const {
    id,
    accountName,
    currency: { code, isoCode, locale },
    total_balance,
  } = account;

  return (
    <TouchableOpacity onPress={onPress} style={styles({ left, right, selected }).wrapper} activeOpacity={0.5}>
      <View style={styles({}).container}>
        <CountryFlag
          isoCode={isoCode!}
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
          <Text style={styles({}).textLabel}>{`${accountName}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccountCard;
