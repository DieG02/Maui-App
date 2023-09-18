import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useGetIncomeById from '../../services/Incomes/useGetIncomeById';
import EditIncomeForm from '../../components/common/EditIncomeForm';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import useGetTransactions from '../../services/Transactions/useGetAllTransactions';

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const EditIncome = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('balance_stack.edit_income')}
        onPressBack={() => {
          queryClient.removeQueries('IncomeDetail');
          navigation.goBack();
        }}
        hasType
        color={mainColor}
      />
      <EditIncomeForm navigation={navigation} data={params?.income} params={params} />
    </ScreenContainer>
  );
};
export default EditIncome;
