import Toast from 'react-native-toast-message';

export const showToast = (message: string, duration?: number) => {
  Toast.show({
    type: 'success',
    text2: message,
    position: 'top',
    visibilityTime: duration || 1500,
  });
};
