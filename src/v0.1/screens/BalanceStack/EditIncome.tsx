import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import EditIncomeForm from '../../components/common/EditIncomeForm';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import useGetTransactionById from '../../services/Transactions/useGetTransactionById';
import LoadingComponent from '../../components/Library/LoadingComponent/LoadingComponent';

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const EditIncome = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  const { data, isLoading } = useGetTransactionById(params?.income.id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingComponent color={mainColor} />;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('balance_stack.edit_income')}
        onPressBack={() => {
          queryClient.removeQueries('IncomeDetail');
          navigation.goBack();
        }}
      />
      <EditIncomeForm navigation={navigation} data={data} params={params} />
    </ScreenContainer>
  );
};
export default EditIncome;
