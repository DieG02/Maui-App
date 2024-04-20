import { View, Image, Linking, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import customStyles from '../../styles/customStyles';
import Button from '../../components/common/Button';

import useVersion from '../../services/Auth/useVersion';
import { useTranslation } from 'react-i18next';

const { mainColor, textBlack, white } = customStyles;
const playstore_url = 'https://play.google.com/store/apps/details?id=com.maui.app.company&pcampaignid=web_share';

export default function SplashScreen() {
  const { data: version } = useVersion();
  const { t } = useTranslation();
  const [available, setAvailable] = useState<boolean | undefined>();

  const handleUpdate = async () => {
    try {
      const supported = await Linking.canOpenURL(playstore_url);
      if (supported) {
        await Linking.openURL(playstore_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAvailable(version?.available);
  }, [version]);

  if (available === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{t('auth_stack.version_manager.title')}</Text>
        <Button style={styles.button} text={t('auth_stack.version_manager.button')} onPress={handleUpdate} />
      </View>
    );
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
    color: textBlack,
  },
  button: {
    backgroundColor: mainColor,
    height: 45,
    width: '75%',
  },
});
