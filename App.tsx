//@ts-ignore
import { SENTRY_DSN } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import CustomToast from 'react-native-toast-message';
import { QueryClientProvider } from 'react-query';
import { ErrorToast, SuccessToast, WarningToast } from './src/v0.1/components/common/Toast';
import AuthProvider from './src/v0.1/context/AuthContext';
import GeneralProvider from './src/v0.1/context/GeneralContext';
import RootStack from './src/v0.1/screens/RootStack';
import customStyles from './src/v0.1/styles/customStyles';
import { googleAuthConfig } from './src/v0.1/utils/googleConfig';
import { queryClient } from './src/v0.1/utils/queryClient';

const enabled = !__DEV__;

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: enabled,
});

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

export default Sentry.wrap(App);
