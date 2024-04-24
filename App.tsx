import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import AuthProvider from './src/v0.1/context/AuthContext';
import GeneralProvider from './src/v0.1/context/GeneralContext';
import { queryClient } from './src/v0.1/utils/queryClient';
import { StatusBar } from 'react-native';
import customStyles from './src/v0.1/styles/customStyles';
import RootStack from './src/v0.1/screens/RootStack';
import { SuccessToast, WarningToast, ErrorToast } from './src/v0.1/components/common/Toast';
import CustomToast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleAuthConfig } from './src/v0.1/utils/googleConfig';

const { white } = customStyles;
const statusBarStyle = 'dark-content';

const toastConfig = {
  success: SuccessToast,
  warning: WarningToast,
  error: ErrorToast,
};

const App = () => {
  useEffect(() => {
    GoogleSignin.configure(googleAuthConfig);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GeneralProvider>
          <StatusBar barStyle={statusBarStyle} backgroundColor={white} />
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
          <CustomToast config={toastConfig} />
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
