import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import useRefresh from '../../hooks/useRefresh';
import useGetAllDebts from '../../services/Debts/useGetAllDebts';
import customStyles from '../../styles/customStyles';

const { background, mainColor } = customStyles;

const IncomeDebt = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<any>();
  const { data: debts, isLoading, refetch } = useGetAllDebts();
  const { refreshing, handleRefresh } = useRefresh(refetch);

  const total = useCallback(() => {
    let total = 0;
    debts?.incomes?.map(debt => (total += debt.totalToPay));
    return total;
  }, [debts]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    ></View>
  );
};

export default IncomeDebt;
