import { View, Text, StyleSheet } from 'react-native';
import customStyles from '../../styles/customStyles';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { parserToCurrency } from '../../utils/adapter';

interface Props {
  amountPaid?: number;
  totalAmount?: number;
  amountToPay?: number;
  currency: {
    code: string;
    locale: string;
    isoCode: string;
  };
}

const { textBlack, mainColor, background2 } = customStyles;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: background2,
    // height: 100,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  cardLabel: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  progressBarBase: {
    width: '100%',
    backgroundColor: '#EAEAEA',
    borderRadius: 40,
    height: 25,
    marginBottom: 6,
  },
  processBarLabel: {
    paddingRight: 8,
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
});

const paidStyles = (paidValue: number) =>
  StyleSheet.create({
    progressBar: {
      backgroundColor: mainColor,
      width: paidValue <= 13 ? '12%' : paidValue + '%',
      position: 'absolute',
      borderRadius: 20,
      height: '100%',
      justifyContent: 'center',
    },
  });

export default function DebtPaidDetail({ amountPaid, totalAmount, amountToPay, currency }: Props) {
  const { t } = useTranslation();
  const paidValue = useMemo(
    () => (amountPaid && totalAmount ? Number(((amountPaid / totalAmount) * 100).toFixed(0)) : 0),
    [amountPaid, totalAmount]
  );

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLabel}>
        <Text
          style={{
            color: textBlack,
            fontFamily: 'Gilroy-Bold',
            fontSize: 16,
          }}
        >
          {t('debt_stack.debtor_profile.to_be_credit')}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: textBlack,
            maxWidth: '80%',
            fontSize: 16,
          }}
          numberOfLines={1}
        >
          <Text
            style={{
              color: mainColor,
              maxWidth: '60%',
            }}
            numberOfLines={1}
          >
            {parserToCurrency(amountToPay as number, currency.locale, currency.code)}
          </Text>{' '}
          / {parserToCurrency(totalAmount as number, currency.locale, currency.code)}
        </Text>
      </View>
      <View style={styles.progressBarBase}>
        <View style={paidStyles(paidValue).progressBar}>
          <Text style={styles.processBarLabel}>{paidValue}%</Text>
        </View>
      </View>
    </View>
  );
}
