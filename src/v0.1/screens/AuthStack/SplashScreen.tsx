import { View, Image, Linking, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import customStyles from '../../styles/customStyles';
import Button from '../../components/common/Button';
import { useTranslation } from 'react-i18next';
import { getLocaleFromAsyncStorage } from '../../utils/getUserInfo';
import i18n from '../../services/i18n-config';
import { getLocales } from 'react-native-localize';
import useGetLinks from '../../services/Links/useGetLinks';
import { AppStatus, IAppVersion, ILink, ILinkType } from '../../types/types';
import ErrorImage from '../../assets/404-error.png';
import Spacer from '../../components/common/Spacer';
import UpdateMobile from '../../assets/mobile-phone.png';

const defaultLenguage = getLocales()[0].languageCode;
const { mainColor, textBlack, white } = customStyles;

interface Props {
  version?: IAppVersion;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: textBlack,
    fontFamily: 'Gilroy-Regular',
    alignSelf: 'center',
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: mainColor,
    height: 45,
    width: '75%',
  },
});

export default function SplashScreen({ version }: Props) {
  const { data: links } = useGetLinks();
  const { t } = useTranslation();

  const playStoreLink = links?.find((link: ILink) => link.name.toUpperCase() === ILinkType.PLAYSTORE)?.url as string;

  const handleUpdate = async () => {
    try {
      const supported = await Linking.canOpenURL(playStoreLink);
      if (supported) {
        await Linking.openURL(playStoreLink);
      }
    } catch (error) {
      console.error(error);
    }
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

  if (version?.available === false) {
    if (version.status === AppStatus.DEPRECATED) {
      return (
        <View style={styles.container}>
          <Image source={UpdateMobile} style={{ width: 300, height: 300 }} />
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              color: textBlack,
              fontFamily: 'Gilroy-SemiBold',
            }}
          >
            {t('auth_stack.version_manager.update_title')}
          </Text>
          <Text style={styles.message}>{t('auth_stack.version_manager.update')}</Text>
          <Button
            onPress={handleUpdate}
            text={t('auth_stack.version_manager.button')}
            color={white}
            style={{
              backgroundColor: mainColor,
              borderRadius: 20,
              marginHorizontal: 40,
              marginTop: 10,
            }}
          />
        </View>
      );
    }
    if (version.status === AppStatus.ERROR) {
      return (
        <View style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={ErrorImage} style={{ width: 200 }} />
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: 'center',
                color: textBlack,
                fontFamily: 'Gilroy-SemiBold',
              }}
            >
              {t('auth_stack.version_manager.error_title')}
            </Text>
            <Text style={styles.message}>{t('auth_stack.version_manager.error')}</Text>
            <Spacer height={40} />
          </View>
        </View>
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Image source={logo} style={{ width: 260, height: 50 }} />
      </View>
    </View>
  );
}
