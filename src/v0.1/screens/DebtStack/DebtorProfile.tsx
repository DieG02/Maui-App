import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import DebtTypes from './DebtTypes';
import DebtPaidDetail from './DebtPaidDetail';
import LoadingComponent from '../../components/Library/LoadingComponent/LoadingComponent';
import { useTranslation } from 'react-i18next';
import useGetDebtById from '../../services/Debts/useGetDebtsById';
import { useMemo } from 'react';

const Tab = createMaterialTopTabNavigator();

const { mainColor, secondaryColor, white } = customStyles;
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const DebtorProfile = ({ navigation, route }: Props) => {
  const { params } = route;
  const { t } = useTranslation();
  const contactId = params?.contactId;

  const { data: debtor, isLoading } = useGetDebtById(contactId, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <LoadingComponent color={mainColor} />;

  const totalToPay = debtor?.status.totalToPay as number;
  const totalDebt = debtor?.status.totalDebt as number;
  const totalPaid = totalDebt - totalToPay;

  const DebtComponent = () => <DebtTypes data={debtor?.debts} type='debt' />;

  const PayComponent = () => <DebtTypes data={debtor?.payments} type='payment' />;

  return (
    <ScreenContainer>
      <BackHeaderTitle label={debtor?.profile.name as string} onPressBack={navigation.goBack} />
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        <DebtPaidDetail amountPaid={totalPaid} amountToPay={totalToPay} totalAmount={totalDebt} />
        <Tab.Navigator
          overScrollMode='never'
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
          <Tab.Screen name={t('debt_stack.debtor_profile.debt')} component={DebtComponent} />
          <Tab.Screen name={t('debt_stack.debtor_profile.credited')} component={PayComponent} />
        </Tab.Navigator>
        {/* {totalToPay === 0 ? (
          <Button
            text={t('debt_stack.debtor_profile.to_credit')}
            disabled
            style={{ backgroundColor: background2 }}
            color={mainColor}
          />
        ) : (
          <CustomModal title={t('debt_stack.debtor_profile.to_credit')}>
            <RepayModal
              amount={totalToPay.toLocaleString()}
              id={debtor?.debts[0].transaction[0].id as string}
              type={debtor?.debts[0].type === 'DEBIT' ? 'DEBIT' : 'CREDIT'}
            />
          </CustomModal>
        )} */}
      </View>
    </ScreenContainer>
  );
};

export default DebtorProfile;
