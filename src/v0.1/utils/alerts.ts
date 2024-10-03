import { Alert } from 'react-native';
import { t } from 'i18next';

export const alertDelete = (text: string, fnConfirm: any) => {
  Alert.alert(t('app_settings.alerts.delete.title'), text, [
    {
      text: t('app_settings.alerts.delete.cancel'),
      style: 'cancel',
    },
    {
      text: t('app_settings.alerts.delete.confirm'),
      onPress: () => fnConfirm(),
    },
  ]);
};

export const alertUpdate = (text: string, fnConfirm: any) => {
  Alert.alert(t('app_settings.alerts.update.title'), text, [
    {
      text: t('app_settings.alerts.update.cancel'),
      style: 'cancel',
    },
    {
      text: t('app_settings.alerts.update.confirm'),
      onPress: () => fnConfirm(),
    },
  ]);
};

export const commonAlert = (text: string) => {
  Alert.alert(t('app_settings.alerts.error.title'), text, [
    {
      text: t('app_settings.alerts.error.confirm'),
      style: 'default',
    },
  ]);
};
