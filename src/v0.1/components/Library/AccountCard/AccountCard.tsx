import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import CountryFlag from 'react-native-country-flag';
import { IFinancialAccount } from '../../../types/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Props {
  account: IFinancialAccount;
  left?: number;
  right?: number;
}

const AccountCard = ({ account, left, right }: Props) => {
  const {
    id,
    accountName,
    currency: { code, isoCode },
    total_balance,
  } = account;
  const navigation = useNavigation<NavigationProp<any, any>>();

  const handleOnPress = () => {
    navigation.navigate('AccountDetail', { id });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles({ left, right }).wrapper} activeOpacity={0.5}>
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
