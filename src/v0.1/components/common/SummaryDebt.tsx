import { View, Text } from 'react-native';
import customStyles from '../../styles/customStyles';
import { useTranslation } from 'react-i18next';

const { white, mainColor } = customStyles;

interface Props {
  type: 'income' | 'expense';
  amount: number;
  stakeholders: number;
}

const SummaryDebt = ({ type, amount, stakeholders }: Props) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        height: 60,
        backgroundColor: mainColor,
        flexDirection: 'column',
        display: 'flex',
        paddingHorizontal: 20,
        margin: 20,
        borderRadius: 10,
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontWeight: 'bold', color: white }}>
        {t('debt_stack.debt_screen.summary_text.total')}{' '}
        {`${
          type === 'income'
            ? t('debt_stack.debt_screen.summary_text.receivables')
            : t('debt_stack.debt_screen.summary_text.payables')
        }`}
      </Text>
      <Text style={{ color: white }}>
        {amount?.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        })}{' '}
        {t('debt_stack.debt_screen.summary_text.of')} {stakeholders}{' '}
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
