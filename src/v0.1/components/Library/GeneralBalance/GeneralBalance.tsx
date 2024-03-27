import React from 'react';
import { Text, View } from 'react-native';
import useToggle from '../../../hooks/useToggle';
import customStyles from '../../../styles/customStyles';
import HiderComponent from '../../common/HiderComponent';
import styles from './style';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'react-native-country-flag';
import Spacer from '../../common/Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { parserToCurrency } from '../../../utils/adapter';

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  data: {
    financialAccount: {
      id: string;
      businessId: string;
      accountName: string;
      currency: {
        code: string;
        locale: string;
        isoCode: string;
      };
    };
    total_balance: number;
  };
}
const GeneralBalance = ({ data }: Props) => {
  const { t } = useTranslation();
  const { value, toggle } = useToggle();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <CountryFlag
            isoCode={data?.financialAccount.currency.isoCode}
            size={30}
            style={{
              width: 25,
              height: 25,
              borderRadius: 30,
              marginRight: 10,
            }}
          />
          <Text style={styles.text}>{t('home_stack.budget.title') + ' ' + data.financialAccount.currency.code}</Text>
        </View>
      </View>
      <Spacer height={8} />

      <View style={styles.container}>
        {value ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                flexDirection: 'row',
              }}
            >
              <Icon
                name={value ? 'circle' : 'circle-thin'}
                color={textBlack}
                style={{
                  marginRight: 5,
                }}
              />
              <Icon
                name={value ? 'circle' : 'circle-thin'}
                color={textBlack}
                style={{
                  marginRight: 5,
                }}
              />
              <Icon
                name={value ? 'circle' : 'circle-thin'}
                color={textBlack}
                style={{
                  marginRight: 5,
                }}
              />
              <Icon
                name={value ? 'circle' : 'circle-thin'}
                color={textBlack}
                style={{
                  marginRight: 5,
                }}
              />
            </View>
            <HiderComponent size={20} color={textBlack} value={value} toggle={toggle} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.textPrice}>
                {parserToCurrency(
                  data?.total_balance,
                  data?.financialAccount.currency.locale,
                  data?.financialAccount.currency.code
                )}
              </Text>
            </View>
            <HiderComponent size={20} color={textBlack} value={value} toggle={toggle} />
          </View>
        )}
      </View>
    </View>
  );
};

export default GeneralBalance;
