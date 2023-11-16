import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import { getLocales } from 'react-native-localize';
import { getLocaleFromAsyncStorage } from './src/v0.1/utils/getUserInfo';
import i18n from './src/v0.1/services/i18n-config';
import AuthProvider from './src/v0.1/context/AuthContext';
import GeneralProvider from './src/v0.1/context/GeneralContext';
import { queryClient } from './src/v0.1/utils/queryClient';
import { StatusBar } from 'react-native';
import customStyles from './src/v0.1/styles/customStyles';
import RootStack from './src/v0.1/screens/RootStack';
import { SuccessToast, WarningToast, ErrorToast } from './src/v0.1/components/common/Toast';
import CustomToast from 'react-native-toast-message';

const { white } = customStyles;
const statusBarStyle = 'dark-content';

const defaultLenguage = getLocales()[0].languageCode;

const App = () => {
  const toastConfig = {
    success: SuccessToast,
    warning: WarningToast,
    error: ErrorToast,
  };

  useEffect(() => {
    const loadLanguage = async () => {
      const locale = await getLocaleFromAsyncStorage();
      if (locale) {
        i18n.changeLanguage(locale);
      } else {
        i18n.changeLanguage(defaultLenguage);
      }
    };
    loadLanguage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GeneralProvider>
          <StatusBar barStyle={statusBarStyle} backgroundColor={white} />
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
          <CustomToast config={toastConfig}/>
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
