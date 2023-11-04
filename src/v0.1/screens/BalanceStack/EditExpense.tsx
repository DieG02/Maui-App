import { NavigationProp, RouteProp } from '@react-navigation/native';
import 'moment-timezone';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import ExpenseDetail from './ExpenseDetail';
import { useTranslation } from 'react-i18next';
import useGetTransactionById from '../../services/Transactions/useGetTransactionById';
import LoadingComponent from '../../components/Library/LoadingComponent/LoadingComponent';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const { mainColor } = customStyles;

const EditExpense = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { params } = route;
  const { data, isLoading } = useGetTransactionById(params?.expense.id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingComponent color={mainColor} />;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('balance_stack.edit_expense')}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <ExpenseDetail navigation={navigation} data={data} params={params} />
    </ScreenContainer>
  );
};

export default EditExpense;
