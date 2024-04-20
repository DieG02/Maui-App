import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useVerifyToken from '../services/Account/useVerifyToken';
import HomeTabs from '../navigation/HomeTabs';

// MORE STACK
import UserDataScreen from './MoreStack/UserData';
import SettingsScreen from './MoreStack/SettingsScreen';
import MoreScreen from './MoreStack/MoreScreen';

// AUTH STACK
// import SignInScreen from './AuthStack/SignInScreen';
// import SignUpScreen from './AuthStack/SignUpScreen';
import SplashScreen from './AuthStack/SplashScreen';

// BALANCE STACK
import NewIncome from './BalanceStack/NewIncome';
import EditIncome from './BalanceStack/EditIncome';
import NewExpense from './BalanceStack/NewExpense';
import EditExpense from './BalanceStack/EditExpense';
import TransactionDetail from './BalanceStack/TransactionDetail';

// CONTACT STACK
import ClientsScreen from './ContactStack/Clients';
import ContactDetail from './ContactStack/ContactDetail';
import ProvidersScreen from './ContactStack/Providers';
import NewContact from './ContactStack/NewContact';

// DEBT STACK
import DebtsScreen from './DebtStack/Debts';
import DebtorScreen from './DebtStack/DebtorProfile';
import DebtDetail from './DebtStack/DebtDetail';
import EditDebt from './DebtStack/EditDebt';
import IndividualPayment from './DebtStack/IndividualPayment';
import { LoginScreen, RegisterScreen } from './AuthStack';
import LoadingScreen from './AuthStack/LoadingScreen';
import useGetCountries from '../services/Countries/useGetCountries';
import useGetCountryCode from '../services/CountryCode/useGetCountryCode';
import MonthlySummariesScreen from './HomeStack/MonthlySummariesScreen';
import useVersion from '../services/Auth/useVersion';
import useGetLinks from '../services/Links/useGetLinks';

const Stack = createNativeStackNavigator<RootStackParamList>();

/* <Stack.Screen name='Login' component={SignInScreen} /> */
/* <Stack.Screen name='SignUp' component={SignUpScreen} /> */

export default function RootStack() {
  const { data: token, isFetching } = useVerifyToken();
  const { data: version, isLoading, isError } = useVersion();
  const { isLoading: isLoadingCountry } = useGetCountries();
  const { isLoading: isLoadingLinks } = useGetLinks();
  const { isLoading: isLoadingCountryCode } = useGetCountryCode();

  if (isFetching || isLoadingCountry || isLoadingCountryCode || isLoading || isLoadingLinks) return <SplashScreen />;
  if (isError) {
    return (
      <SplashScreen
        version={{
          available: false,
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
          <Stack.Screen name='Loading' component={LoadingScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='HomeTabs' component={HomeTabs} />
          <Stack.Screen name='MonthlySummaries' component={MonthlySummariesScreen} />
          <Stack.Screen name='NewIncome' component={NewIncome} />
          <Stack.Screen name='EditIncome' component={EditIncome} />
          <Stack.Screen name='NewExpense' component={NewExpense} />
          <Stack.Screen name='EditExpense' component={EditExpense} />
          {/* <Stack.Screen name='DebtsModal' component={DebtsModal} /> */}
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
