import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, StackActions } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, StatusBar, Text, View } from 'react-native';
import background from '../../assets/background-image.png';
import googleLogo from '../../assets/google.png';
import logoBlue from '../../assets/logo-blue.png';
import Button from '../../components/common/Button';
import LanguageButton from '../../components/common/LanguageButton';
import OverlayLoading from '../../components/common/OverlayLoading';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import useLoginGoogle from '../../services/Auth/useLoginGoogle';
import customStyles from '../../styles/customStyles';
import { queryClient } from '../../utils/queryClient';

const { textBlack, white, background2, mainColor, height, width } = customStyles;
const statusBarStyle = 'light-content';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const iOS = Platform.OS === 'ios';

  const { mutate, isLoading } = useLoginGoogle({
    onSuccess: async data => {
      try {
        if (data.screenRedirect === 'Register') {
          navigation.dispatch(StackActions.push(data.screenRedirect, { user: data }));
        } else {
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
          width: width * 0.5,
          height: 60,
          position: 'absolute',
          top: iOS ? 80 : 35,
          left: width / 4,
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
              width: width * 0.95,
              height: height * 0.45,
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
      </View>
    </ScreenContainer>
  );
}
