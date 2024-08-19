import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import customStyles from '../../styles/customStyles';

export const SuccessToast = (props: BaseToastProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[styles.content, styles.success_bg]}>
        <Text style={[styles.text, styles.success]}>{t(props.text2!)}</Text>
      </View>
    </View>
  );
};

export const WarningToast = (props: BaseToastProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[styles.content, styles.warning_bg]}>
        <Text style={[styles.text, styles.warning]}>{t(props.text2!)}</Text>
      </View>
    </View>
  );
};

export const ErrorToast = (props: BaseToastProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={[styles.content, styles.error_bg]}>
        <Text style={[styles.text, styles.error]}>{t(props.text2!)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: customStyles.marginHorizontal,
  },
  content: {
    elevation: 2,
    paddingVertical: 10,
    height: 50,
    maxHeight: 60,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 20,
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  success: {
    color: customStyles.income,
  },
  warning: {
    color: customStyles.orange,
  },
  error: {
    color: customStyles.expense,
  },
  success_bg: {
    backgroundColor: '#DEFAEF',
  },
  warning_bg: {
    backgroundColor: '#FEF4DF',
  },
  error_bg: {
    backgroundColor: '#FEEFF0',
  },
});
