import { View, Image, StatusBar, Text } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import logoBlue from '../../assets/logo-blue.png';
import background from '../../assets/background-image.png';
import googleLogo from '../../assets/google.png';
import ScreenContainer from '../../components/containers/ScreenContainer';
import Button from '../../components/common/Button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
import LanguageButton from '../../components/common/LanguageButton';
import { NavigationProp, StackActions } from '@react-navigation/native';
import useLoginGoogle from '../../services/Auth/useLoginGoogle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import { queryClient } from '../../utils/queryClient';
import OverlayLoading from '../../components/common/OverlayLoading';
import Spacer from '../../components/common/Spacer';

const { textBlack, white, background2, mainColor } = customStyles;
const statusBarStyle = 'light-content';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const { mutate, isLoading } = useLoginGoogle({
    onSuccess: async data => {
      try {
        if (data.screenRedirect === 'Register') {
          navigation.dispatch(StackActions.push(data.screenRedirect, { user: data }));
        } else {
          await GoogleSignin.signIn();
          await AsyncStorage.setItem('userInfo', JSON.stringify(data));
          queryClient.invalidateQueries(VERIFY_TOKEN);
        }
      } catch (error) {
        console.error('Something went wrong', error);
      }
    },
  });

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn = await GoogleSignin.isSignedIn();
      isSignedIn && (await GoogleSignin.signOut());
      const { user } = await GoogleSignin.signIn();
      if (user) {
        mutate({
          data: {
            name: user.name!,
            email: user?.email,
            authSource: 'GOOGLE',
            photo: user.photo!,
          },
        });
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <ScreenContainer
      style={{
        backgroundColor: mainColor,
      }}
    >
      <OverlayLoading isLoading={isLoading} />
      <StatusBar backgroundColor={mainColor} barStyle={statusBarStyle} />
      <Spacer height={20} />
      <LanguageButton />
      <Image
        source={logoBlue}
        style={{
          width: 240,
          height: 60,
          position: 'absolute',
          top: 35,
          left: '50%',
          marginLeft: -120,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: 40,
        }}
      >
        <View>
          <Image
            source={background}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </View>

        <Text
          style={{
            color: white,
            fontSize: 30,
            fontFamily: 'Gilroy-Regular',
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          {t('auth_stack.login_title')}
        </Text>
        <Button
          disabled={false}
          onPress={handleLogin}
          text={t('auth_stack.login_google')}
          icon={<Image source={googleLogo} style={{ width: 25, height: 25 }} />}
          color={textBlack}
          style={{
            width: '100%',
            backgroundColor: background2,
            marginTop: 20,
            borderRadius: 20,
            marginBottom: 20,
          }}
        />
        {/* <Button
          disabled
          text={t('auth_stack.login_email')}
          icon={<Email name='email' size={24} color={textBlack} />}
          color={textBlack}
          style={{
            backgroundColor: background2,
            width: '100%',
          }}
        /> */}
      </View>
    </ScreenContainer>
  );
}
