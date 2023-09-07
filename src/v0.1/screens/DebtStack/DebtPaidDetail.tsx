import { View, Text, StyleSheet } from 'react-native';
import customStyles from '../../styles/customStyles';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  amountPaid?: number;
  totalAmount?: number;
  amountToPay?: number;
}

const { expense, secondaryColor, orange, textBlack, income } = customStyles;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: secondaryColor,
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
    borderRadius: 12,
    height: 20,
    marginBottom: 6,
  },
  processBarLabel: {
    paddingRight: 11,
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
});

const paidStyles = (paidValue: number) =>
  StyleSheet.create({
    progressBar: {
      backgroundColor: orange,
      width: paidValue <= 13 ? '18%' : paidValue + '%',
      position: 'absolute',
      borderRadius: 10,
      height: '100%',
      justifyContent: 'center',
    },
  });

export default function DebtPaidDetail({ amountPaid, totalAmount, amountToPay }: Props) {
  const { t } = useTranslation();
  const paidValue = useMemo(
    () => (amountPaid && totalAmount ? Number(((amountPaid / totalAmount) * 100).toFixed(2)) : 0),
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
              color: amountToPay !== 0 ? expense : income,
              maxWidth: '60%',
            }}
            numberOfLines={1}
          >
            ${amountToPay}
          </Text>{' '}
          {t('debt_stack.debt_screen.summary_text.of')} ${totalAmount}
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
