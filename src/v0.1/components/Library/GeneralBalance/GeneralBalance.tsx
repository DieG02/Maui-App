import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useToggle from '../../../hooks/useToggle';
import customStyles from '../../../styles/customStyles';
import HiderComponent from '../../common/HiderComponent';
import styles from './style';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from '../../common/Icon';
import Back from 'react-native-vector-icons/Ionicons';
import { parserToCurrency } from '../../../utils/adapter';
import { NavigationProp } from '@react-navigation/native';
import { IBalance } from '../../../types/types';

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  navigation: NavigationProp<any, any>;
  data: IBalance;
}

const GeneralBalance = ({ data, navigation }: Props) => {
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
            isoCode={data?.financialAccount.currency.isoCode}
            size={25}
            style={{
              width: 25,
              height: 25,
              borderRadius: 30,
              marginRight: 10,
            }}
          />
          <Text style={styles.text}>{t('home_stack.budget.title') + ' ' + data.financialAccount.currency.code}</Text>
          <HiderComponent size={20} color={textBlack} value={value} toggle={toggle} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MonthlySummaries')}
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
                <Icon
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
              {parserToCurrency(
                data?.total_balance,
                data?.financialAccount.currency.locale,
                data?.financialAccount.currency.code
              )}
            </Text>
          )}
          <Icon1
            onPress={() => navigation.navigate('MonthlySummaries')}
            style={{
              width: 60,
            }}
          >
            <Back name='chevron-forward' size={25} color={textBlack} />
          </Icon1>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GeneralBalance;
