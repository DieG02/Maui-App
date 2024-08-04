import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useToggle from '../../../hooks/useToggle';
import customStyles from '../../../styles/customStyles';
import HiderComponent from '../../common/HiderComponent';
import styles from './style';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'react-native-country-flag';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import IconContainer from '../../common/Icon';
import { parserToCurrency } from '../../../utils/adapter';
import { NavigationProp } from '@react-navigation/native';
import { IBalance } from '../../../types/types';

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  navigation: NavigationProp<any, any>;
  multiple: boolean;
  data: any;
}

const GeneralBalance = ({ data: { total_balance, financialAccount }, multiple, navigation }: Props) => {
  const { t } = useTranslation();
  const { value, toggle } = useToggle();
  const hideNumber = Array.from({ length: 4 }, (_, i) => i);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
          }}
        >
          <CountryFlag
            isoCode={financialAccount.currency.isoCode}
            size={25}
            style={{
              width: 25,
              height: 25,
              borderRadius: 30,
              marginRight: 10,
            }}
          />
          <Text style={styles.text}>{t('home_stack.budget.title') + ' ' + financialAccount.currency.code}</Text>
          <HiderComponent size={20} color={textBlack} value={value} toggle={toggle} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewFinancialAccount')}
          // onPress={() => navigation.navigate('MonthlySummaries')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 20,
          }}
        >
          {value ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                flexDirection: 'row',
              }}
            >
              {hideNumber.map(index => (
                <FontAwesome
                  key={index}
                  name={value ? 'circle' : 'circle-thin'}
                  color={textBlack}
                  style={{
                    marginRight: 5,
                  }}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.textPrice}>
              {parserToCurrency(total_balance, financialAccount.currency.locale, financialAccount.currency.code)}
            </Text>
          )}
          <IconContainer
            onPress={() => navigation.navigate('MonthlySummaries')}
            style={{
              width: 60,
            }}
          >
            <Ionicons name='chevron-forward' size={25} color={textBlack} />
          </IconContainer>
        </TouchableOpacity>
      </View>
      {!multiple && (
        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
          <Feather name='plus' size={25} color={textBlack} style={{ marginRight: 5 }} />
          <View>
            <Text style={styles.buttonLabel}>{'Add balance'}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GeneralBalance;
