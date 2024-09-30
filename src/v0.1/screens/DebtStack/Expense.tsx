import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import useRefresh from '../../hooks/useRefresh';
import useGetAllDebts from '../../services/Debts/useGetAllDebts';
import customStyles from '../../styles/customStyles';

const { background, mainColor } = customStyles;

const ExpenseDebt = () => {
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation();

  const { data: debts, isLoading, refetch } = useGetAllDebts();

  const { refreshing, handleRefresh } = useRefresh(refetch);

  const total = useCallback(() => {
    let total = 0;
    debts?.expenses?.map(debt => (total += debt.totalToPay));
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

export default ExpenseDebt;
