import { View, Text, TouchableOpacity, Image, StatusBar, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, StackActions } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import CommonInput from '../../components/common/CommonInput';
import customStyles from '../../styles/customStyles';
import logo from '../../assets/logo.png';
import { useMutation } from 'react-query';
import { signIn } from '../../services/auth';
import { AuthContext } from '../../context/AuthContext';
import ScreenContainer from '../../components/containers/ScreenContainer';
import Form from '../../components/Library/Form';
import Button from '../../components/common/Button';
import useForm from '../../hooks/useForm';
import SecureInput from '../../components/common/SecureInput';
import { useTranslation } from 'react-i18next';
import { queryClient } from '../../utils/queryClient';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';

interface Props {
  navigation: NavigationProp<any, any>;
}
const { mainColor, textBlack, white, background2 } = customStyles;
const statusBarStyle = 'dark-content';
const KEY_PATH = 'auth_stack.sign_in';

interface LoginUser {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: LoginUser = {
  email: '',
  password: '',
  confirmPassword: ''
};

const toValidate = ['email', 'password'];

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setValues, validateValues, values } = useForm<LoginUser>(initialValues);

  const { mutateAsync } = useMutation(signIn);

  const onPressLogin = async () => {
    const data = await mutateAsync(values);
    if (data.token) {
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoggedIn(true);
      queryClient.invalidateQueries(VERIFY_TOKEN);
    }
  };

  // useEffect(() => {
  //   const handleIsLoggedIn = async () => {
  //     if (isLoggedIn) navigation.dispatch(StackActions.replace("HomeTabs"));
  //   };
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     handleIsLoggedIn();
  //   });

  //   return unsubscribe;
  // }, [navigation, isLoggedIn]);

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={white} barStyle={statusBarStyle} />
      <Form>
        <View
          style={{
            marginTop: 60,
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 35 }}>
            <Image source={logo} style={{ width: 200, height: 40 }} />
          </View>

          <CommonInput
            required
            name={t('more_screen.user_data.mail')}
            value={values.email}
            marginBottom={25}
            placeholder={t(`${KEY_PATH}.placeholder_email`)}
            autoCapitalize='none'
            keyboardType='email-address'
            setValue={text => setValues(prev => ({ ...prev, email: text }))}
          />

          <SecureInput
            required
            secureTextEntry={true}
            name={t(`${KEY_PATH}.password`)}
            setValue={text => setValues(prev => ({ ...prev, password: text }))}
            value={values.password}
            placeholder={t(`${KEY_PATH}.placeholder_password`)}
            marginBottom={25}
          />
          
          <Button
            disabled={!validateValues(toValidate)}
            onPress={onPressLogin}
            text={t(`${KEY_PATH}.sign_in_button`)}
            color={validateValues(toValidate) ? white : mainColor}
            style={{
              backgroundColor: validateValues(toValidate) ? mainColor : background2,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
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
              {t(`${KEY_PATH}.no_account`)}
            </Text>
            <Text
              style={{
                color: mainColor,
                fontFamily: 'Gilroy-Bold',
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              {t(`${KEY_PATH}.create_account`)}
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
    </ScreenContainer>
  );
}
