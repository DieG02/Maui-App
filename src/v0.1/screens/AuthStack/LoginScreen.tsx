import { View, Image, StatusBar } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import logo from '../../assets/logo.png';
import googleLogo from '../../assets/google.png';
import ScreenContainer from '../../components/containers/ScreenContainer';
import Button from '../../components/common/Button';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
import Email from 'react-native-vector-icons/Fontisto';
import LanguageButton from '../../components/common/LanguageButton';
import { NavigationProp } from '@react-navigation/native';

const { textBlack, white, background2 } = customStyles;
const statusBarStyle = 'dark-content';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn = await GoogleSignin.isSignedIn();
      isSignedIn && (await GoogleSignin.signOut());
      const { user } = await GoogleSignin.signIn();
      if (user) {
        navigation.navigate('Loading', { data: user });
      }
    } catch (error) {
      if (statusCodes.PLAY_SERVICES_NOT_AVAILABLE === error.code) {
      } else if (statusCodes.SIGN_IN_CANCELLED === error.code) {
      } else if (statusCodes.IN_PROGRESS === error.code) {
      }
    }
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={white} barStyle={statusBarStyle} />
      <LanguageButton />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginHorizontal: 30,
        }}
      >
        <View
          style={{
            marginTop: -180,
            marginBottom: 150,
          }}
        >
          <Image source={logo} style={{ width: 200, height: 40 }} />
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Button
            disabled={false}
            onPress={handleLogin}
            text={t('auth_stack.login_google')}
            icon={<Image source={googleLogo} style={{ width: 25, height: 25 }} />}
            color={textBlack}
            style={{
              width: '100%',
              backgroundColor: background2,
            }}
          />
          <Button
            disabled
            text={t('auth_stack.login_email')}
            icon={<Email name='email' size={24} color={textBlack} />}
            color={textBlack}
            style={{
              backgroundColor: background2,
              marginTop: 25,
              width: '100%',
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
