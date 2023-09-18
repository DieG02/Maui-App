import { NavigationProp, RouteProp } from '@react-navigation/native';
import 'moment-timezone';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import ExpenseDetail from './ExpenseDetail';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';

const { background2 } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const EditExpense = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('balance_stack.edit_expense')}
        headerStyle={{ backgroundColor: background2 }}
        onPressBack={() => {
          queryClient.removeQueries('expenseDetail');
          navigation.goBack();
        }}
      />
      <ExpenseDetail navigation={navigation} data={params?.expense} params={params} />
    </ScreenContainer>
  );
};

export default EditExpense;
