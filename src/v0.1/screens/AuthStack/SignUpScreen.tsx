import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';
import CommonInput from '../../components/common/CommonInput';
import customStyles from '../../styles/customStyles';

import { signIn, signUp } from '../../services/auth';
import ScreenContainer from '../../components/containers/ScreenContainer';
import Form from '../../components/Library/Form';
import useForm from '../../hooks/useForm';
import Button from '../../components/common/Button';
import SecureInput from '../../components/common/SecureInput';
import PhoneInput from '../../components/common/PhoneInput';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { BackHeaderTitleLanguage } from '../../components/common/HeaderTitleLanguage';
import { languageList } from '../../helpers/languageList';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import { queryClient } from '../../utils/queryClient';
import Toast from 'react-native-toast-message';
import { countryList } from '../../helpers/countryList';

interface Props {
  navigation: NavigationProp<any, any>;
}

interface SignUpUser {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  cellphone: string;
  country: string;
  countryCode: string;
  currencyCountry: string;
}

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  cellphone: '',
  country: '',
  countryCode: '',
  currencyCountry: '',
};

const { mainColor, textBlack, background2, white } = customStyles;

const toValidate = ['email', 'password', 'confirmPassword', 'name', 'cellphone'];

export default function SignUpScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState('AR');
  const [modalVisible, setModalVisible] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const { setValues, validateValues, values } = useForm<SignUpUser>(initialValues);

  const { mutateAsync } = useMutation(signUp, {
    onSuccess: async () => {
      try {
        const data = await signIn({ email: values.email, password: values.password });
        const value = {
          ...data,
          locale: i18n.language,
        };
        await AsyncStorage.setItem('userInfo', JSON.stringify(value));
        setIsLoggedIn(true);
        queryClient.invalidateQueries(VERIFY_TOKEN);
      } catch (error) {
        console.error('Error al iniciar sesión después de registrarse', error);
      }
    },
  });

  const countrySelected = useMemo(() => {
    return countryList.filter(item => item.isoCode === country)[0];
  }, [country]);

  const validatePassword = (): string | null => {
    if (values.password !== values.confirmPassword) return 'mismatch_password';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = passwordRegex.test(values.password);
    if (!isValidPassword) return 'alert_validate_password';

    return null;
  };

  const onPressSignUp = async () => {
    const validationError = validatePassword();
    if (validationError) {
      return Toast.show({
        type: 'error',
        text2: `auth_stack.sign_in.${validationError}`,
        position: 'bottom',
      });
    }

    await mutateAsync({
      ...values,
      country: countrySelected.countryName,
      countryCode: countrySelected.isoCode,
      currencyCountry: countrySelected.countryName,
    });
  };

  return (
    <ScreenContainer>
      <BackHeaderTitleLanguage
        label={t('auth_stack.sign_in.create_account')}
        onPressBack={() => navigation.goBack()}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        options={languageList}
      />
      <Form>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <CommonInput
            required
            name={t('more_screen.user_data.name')}
            setValue={text => setValues(prev => ({ ...prev, name: text }))}
            value={values.name}
            marginBottom={25}
            placeholder={t('auth_stack.sign_up.placeholder_name')}
            keyboardType='default'
          />
          {/* Reemplaza values.cellPhone por 'AR', luego usa el modal en la app y selecciona otro pais. Finalmente cambias 'AR' por values.cellPhone. Haz lo mismo en UserData.tsx */}
          <PhoneInput
            value={values.cellphone}
            setValue={text => setValues(prev => ({ ...prev, cellphone: text }))}
            countryCode={country}
            setCountryCode={value => setCountry(value)}
            name={t('more_screen.user_data.phone')}
            placeholder={t('auth_stack.sign_up.placeholder_phone')}
            marginBottom={25}
          />
          <CommonInput
            required
            name={t('more_screen.user_data.mail')}
            setValue={text => setValues(prev => ({ ...prev, email: text }))}
            value={values.email}
            marginBottom={25}
            placeholder={t('auth_stack.sign_in.placeholder_email')}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <SecureInput
            required
            secureTextEntry={true}
            name={t('auth_stack.sign_in.password')}
            setValue={text => setValues(prev => ({ ...prev, password: text.trim() }))}
            value={values.password}
            placeholder={t('auth_stack.sign_in.placeholder_password')}
            marginBottom={25}
          />
          <SecureInput
            required
            secureTextEntry={true}
            name={t('auth_stack.sign_in.confirm_password')}
            setValue={text => setValues(prev => ({ ...prev, confirmPassword: text.trim() }))}
            value={values.confirmPassword}
            placeholder={t('auth_stack.sign_in.placeholder_confirm_password')}
            marginBottom={25}
          />
          <Button
            disabled={!validateValues(toValidate)}
            onPress={onPressSignUp}
            color={validateValues(toValidate) ? white : mainColor}
            text={t('auth_stack.sign_in.create_account')}
            style={{
              backgroundColor: validateValues(toValidate) ? mainColor : background2,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                color: textBlack,
                fontFamily: 'Gilroy-Regular',
                fontSize: 16,
              }}
            >
              {t('auth_stack.sign_up.have_account')}
            </Text>
            <Text
              style={{
                color: mainColor,
                fontFamily: 'Gilroy-Bold',
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              {t('auth_stack.sign_in.sign_in_button')}
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
    </ScreenContainer>
  );
}
