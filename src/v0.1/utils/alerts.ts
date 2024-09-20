import { Alert } from 'react-native';

export const alertDelete = (text: string, fnConfirm: any) => {
  Alert.alert('Delete', text, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Delete',
      onPress: () => fnConfirm(),
    },
  ]);
};

export const alertUpdate = (text: string, fnConfirm: any) => {
  Alert.alert('Delete', text, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Continue',
      onPress: () => fnConfirm(),
    },
  ]);
};

export const commonAlert = (text: string) => {
  Alert.alert('Error', text, [
    {
      text: 'Accept',
      style: 'default',
    },
  ]);
};
