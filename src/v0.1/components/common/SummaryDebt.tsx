import { View, Text } from 'react-native';
import customStyles from '../../styles/customStyles';
import { useTranslation } from 'react-i18next';

const { mainColor, background2, textBlack } = customStyles;

interface Props {
  type: 'income' | 'expense';
  amount: string;
  stakeholders: number;
}

const SummaryDebt = ({ type, amount, stakeholders }: Props) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        height: 80,
        backgroundColor: background2,
        flexDirection: 'column',
        display: 'flex',
        paddingHorizontal: 20,
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 15,
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: mainColor, fontSize: 16, padding: 2, fontFamily: 'Gilroy-Bold' }}>
        {t('debt_stack.debt_screen.summary_text.total')}{' '}
        {`${
          type === 'income'
            ? t('debt_stack.debt_screen.summary_text.receivables')
            : t('debt_stack.debt_screen.summary_text.payables')
        }`}
      </Text>
      <Text style={{ color: textBlack, fontSize: 15, padding: 2, fontFamily: 'Gilroy-SemiBold' }}>
        {amount} {t('debt_stack.debt_screen.summary_text.of')} {stakeholders}{' '}
        {`${
          type === 'income'
            ? t('debt_stack.debt_screen.summary_text.clients')
            : t('debt_stack.debt_screen.summary_text.providers')
        }`}
      </Text>
    </View>
  );
};

export default SummaryDebt;
