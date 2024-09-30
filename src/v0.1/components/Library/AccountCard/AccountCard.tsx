import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import customStyles from '../../../styles/customStyles';
import { IFinancialAccount } from '../../../types/types';
import { parserToCurrency } from '../../../utils/adapter';
import styles from './style';

interface Props {
  account: IFinancialAccount;
  left?: number;
  right?: number;
}

const { mainColor } = customStyles;

const AccountCard = ({ account, left, right }: Props) => {
  const {
    id,
    accountName,
    currency: { code, isoCode, locale },
    total_balance,
  } = account;
  const navigation = useNavigation<NavigationProp<any, any>>();

  const handleOnPress = () => {
    navigation.navigate('AccountDetail', { id });
  };

  console.log(account);

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles({ left, right }).wrapper} activeOpacity={0.5}>
      <View style={styles({}).container}>
        {account.mainAccount && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 0,
              borderRadius: 10,
              borderColor: mainColor,
              borderWidth: 1.5,
              padding: 5,
            }}
          >
            <Text
              style={{
                color: mainColor,
                fontSize: 15,
                fontFamily: 'Gilroy-SemiBold',
              }}
            >
              Principal
            </Text>
          </View>
        )}
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
            {parserToCurrency(total_balance, locale, code)}
          </Text>
        </View>
        <Text style={styles({}).textLabel}>{`${accountName}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccountCard;
