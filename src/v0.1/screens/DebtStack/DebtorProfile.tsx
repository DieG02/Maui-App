import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import { useQuery } from 'react-query';
import { getExpenseById, getIncomeDebtById } from '../../services/debts';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import DebtTypes from './DebtTypes';
import RepayModal from '../../components/common/Modals/RepayModal';
import DebtPaidDetail from './DebtPaidDetail';
import PaymentTypes from './PaymentTypes';
import CustomModal from '../../components/common/Modals/CustomModal';
import { useMemo } from 'react';
import LoadingComponent from '../../components/Library/LoadingComponent/LoadingComponent';
import Button from '../../components/common/Button';

const Tab = createMaterialTopTabNavigator();

const { mainColor, secondaryColor, white, background2 } = customStyles;
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const DebtorProfile = ({ navigation, route }: Props) => {
  const { params } = route;
  const expenseId = params?.expenseId;
  const incomeId = route.params?.incomeId;
  const { data: incomeData, isLoading: loadingIncome } = useQuery(['incomeData', incomeId], () =>
    getIncomeDebtById(incomeId)
  );
  const { data: expenseData, isLoading: loadingExpense } = useQuery(['expense', expenseId], () =>
    getExpenseById(expenseId)
  );
  const payValue = useMemo(() => {
    const paid = (incomeData || expenseData)?.amountPaid;
    const total = (incomeData || expenseData)?.totalAmount;
    return paid && total ? (total - paid).toLocaleString('es') : total?.toLocaleString('es');
  }, [incomeData, expenseData]);

  const DebtComponent = () => <DebtTypes data={incomeData?.incomes || expenseData?.expenses} />;

  const PayComponent = () => <PaymentTypes paidData={incomeData?.payments || expenseData?.payments} />;

  return (
    <ScreenContainer>
      <BackHeaderTitle label={params?.name} onPressBack={navigation.goBack} />
      {loadingExpense || loadingIncome ? (
        <LoadingComponent color={mainColor} />
      ) : (
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <DebtPaidDetail
            amountPaid={(incomeData || expenseData)?.amountPaid}
            amountToPay={(incomeData || expenseData)?.amountToPay}
            totalAmount={(incomeData || expenseData)?.totalAmount}
          />
          <Tab.Navigator
            style={{ backgroundColor: white }}
            screenOptions={{
              tabBarStyle: {
                elevation: 0,
                marginHorizontal: 0,
                backgroundColor: secondaryColor,
                borderRadius: 15,
              },
              tabBarPressColor: white,
              tabBarActiveTintColor: white,
              tabBarInactiveTintColor: mainColor,
              tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
              tabBarIndicatorStyle: {
                backgroundColor: mainColor,
                height: 50,
                borderRadius: 15,
              },
              tabBarItemStyle: {
                borderRadius: 15,
                height: 50,
              },
            }}
          >
            <Tab.Screen name='Deuda' component={DebtComponent} />
            <Tab.Screen name='Abonado' component={PayComponent} />
          </Tab.Navigator>
          {payValue === undefined || +payValue === 0 ? (
            <Button text={'Abonado'} disabled style={{ backgroundColor: background2 }} color={mainColor} />
          ) : (
            <CustomModal title='Abonar'>
              <RepayModal amount={payValue || ''} id={incomeId || expenseId} type={incomeData ? 'income' : 'expense'} />
            </CustomModal>
          )}
        </View>
      )}
    </ScreenContainer>
  );
};

export default DebtorProfile;
