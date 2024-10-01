import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from '../navigation/HomeTabs';
import useVerifyToken from '../services/Account/useVerifyToken';
import NewFinancialAccount from './HomeStack/NewFinancialAccount';

// MORE STACK
import MoreScreen from './MoreStack/MoreScreen';
import SettingsScreen from './MoreStack/SettingsScreen';
import UserDataScreen from './MoreStack/UserData';

// AUTH STACK
// import SignInScreen from './AuthStack/SignInScreen';
// import SignUpScreen from './AuthStack/SignUpScreen';
import SplashScreen from './AuthStack/SplashScreen';

// BALANCE STACK
import AccountDetail from './BalanceStack/AccountDetail';
import EditExpense from './BalanceStack/EditExpense';
import EditIncome from './BalanceStack/EditIncome';
import NewExpense from './BalanceStack/NewExpense';
import NewIncome from './BalanceStack/NewIncome';
import TransactionDetail from './BalanceStack/TransactionDetail';

// CONTACT STACK
import ClientsScreen from './ContactStack/Clients';
import ContactDetail from './ContactStack/ContactDetail';
import NewContact from './ContactStack/NewContact';
import ProvidersScreen from './ContactStack/Providers';

// DEBT STACK
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '../components/Library/LoadingComponent';
import useLocalStorage from '../hooks/useLocalStorage';
import useGetAccount from '../services/Account/useGetAccount';
import useVersion from '../services/Auth/useVersion';
import useGeneralBalance from '../services/Balance/useGeneralBalance';
import useGetCountries from '../services/Countries/useGetCountries';
import useGetCountryCode from '../services/CountryCode/useGetCountryCode';
import useGetAllAccounts from '../services/FinancialAccount/useGetAllAccounts';
import useGetLinks from '../services/Links/useGetLinks';
import useGetSubscription from '../services/Subscription/useGetSubscription';
import useGetSuscriptionCapabilities from '../services/SuscriptionCapabilities/useGetCapabilities';
import useGetAllTransactions from '../services/Transactions/useGetAllTransactions';
import customStyles from '../styles/customStyles';
import { AppStatus } from '../types/types';
import { LoginScreen, RegisterScreen } from './AuthStack';
import DebtDetail from './DebtStack/DebtDetail';
import DebtorScreen from './DebtStack/DebtorProfile';
import DebtsScreen from './DebtStack/Debts';
import EditDebt from './DebtStack/EditDebt';
import IndividualPayment from './DebtStack/IndividualPayment';

const { mainColor } = customStyles;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { i18n } = useTranslation();
  const { data: token, isLoading: loadingToken, isFetching } = useVerifyToken();

  const { isLoading: loadingSubscriptionCapabilities } = useGetSuscriptionCapabilities();

  const { data: version, isLoading, isError } = useVersion();
  const { isLoading: isLoadingCountry } = useGetCountries();
  const { isLoading: isLoadingLinks } = useGetLinks();
  const { isLoading: isLoadingCountryCode } = useGetCountryCode();
  const { modifyData } = useLocalStorage();

  const { data: user, isLoading: isFetchingAccount } = useGetAccount({ enabled: !!token });
  const isFetchingTransactions = useGetAllTransactions({ take: 6 }).isLoading;
  const isFetchingGeneralBalance = useGeneralBalance({ enabled: !!token }).isLoading;
  const isFetchingSubscription = useGetSubscription({ enabled: !!token }).isLoading;
  const isFetchingAllAccounts = useGetAllAccounts({ enabled: !!token }).isLoading;

  useEffect(() => {
    // Sync user language with LocaleStorage
    if (user?.language) {
      i18n.changeLanguage(user.language);
      modifyData('locale', user.language);
    }
  }, [user]);

  if (loadingToken || loadingSubscriptionCapabilities) return <SplashScreen />;
  if (
    isFetching ||
    isLoadingCountry ||
    isLoadingCountryCode ||
    isLoading ||
    isLoadingLinks ||
    isFetchingAccount ||
    isFetchingTransactions ||
    isFetchingGeneralBalance ||
    isFetchingAllAccounts ||
    isFetchingSubscription
  )
    return <LoadingComponent color={mainColor} />;
  if (isError) {
    return (
      <SplashScreen
        version={{
          available: false,
          status: AppStatus.ERROR,
          version: '0.0.0',
        }}
      />
    );
  }
  if (!version.available) return <SplashScreen version={version} />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      {!token ? (
        <Stack.Group>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          {/* <Stack.Screen name='Loading' component={LoadingScreen} /> */}
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='HomeTabs' component={HomeTabs} />
          <Stack.Screen name='NewFinancialAccount' component={NewFinancialAccount} />
          {/* <Stack.Screen name='MonthlySummaries' component={MonthlySummariesScreen} /> */}
          <Stack.Screen name='NewIncome' component={NewIncome} />
          <Stack.Screen name='EditIncome' component={EditIncome} />
          <Stack.Screen name='NewExpense' component={NewExpense} />
          <Stack.Screen name='EditExpense' component={EditExpense} />
          <Stack.Screen name='AccountDetail' component={AccountDetail} />
          <Stack.Screen name='TransactionDetail' component={TransactionDetail} />
          <Stack.Screen name='More' component={MoreScreen} />
          <Stack.Screen name='UserData' component={UserDataScreen} />
          <Stack.Screen name='Clients' component={ClientsScreen} />
          <Stack.Screen name='Providers' component={ProvidersScreen} />
          <Stack.Screen name='Settings' component={SettingsScreen} />
          <Stack.Screen name='ContactDetail' component={ContactDetail} />
          <Stack.Screen name='NewContact' component={NewContact} />
          <Stack.Screen name='Debts' component={DebtsScreen} />
          <Stack.Screen name='DebtDetail' component={DebtDetail} />
          <Stack.Screen name='EditDebt' component={EditDebt} />
          <Stack.Screen name='DebtorScreen' component={DebtorScreen} />
          <Stack.Screen name='IndividualPayment' component={IndividualPayment} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
