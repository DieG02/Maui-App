import React, { useMemo, useState } from 'react';
import { View, StatusBar } from 'react-native';
import customStyles from '../../styles/customStyles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import CommonInput from '../../components/common/CommonInput';
import Spacer from '../../components/common/Spacer';
import Button from '../../components/common/Button';
import PhoneInput from '../../components/common/PhoneInput';
import useForm from '../../hooks/useForm';
import { useMutation } from 'react-query';
import { googleSignUp } from '../../services/GoogleAuth/googleSignUp';
import { getCountry } from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import { countryList } from '../../helpers/countryList';

const { white, mainColor } = customStyles;
const statusBarStyle = 'dark-content';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

interface RegisterUser {
  email: string;
  name: string;
  cellphone: string;
  countryCode: string;
  currencyCountry: string;
  country: string;
  photo: string;
}

const initialValues = {
  email: '',
  name: '',
  cellphone: '',
  countryCode: '',
  currencyCountry: '',
  country: '',
  photo: '',
};

const RegisterScreen = ({ route, navigation }: Props) => {
  const { params } = route;
  const currentCountry = getCountry();
  const [country, setCountry] = useState<string>(currentCountry);
  const { t } = useTranslation();

  const { setValues, values } = useForm<RegisterUser>({
    ...initialValues,
    email: params?.user.email,
    name: params?.user.name,
    photo: params?.user.photo,
  });

  const countrySelected = useMemo(() => {
    return countryList.filter(item => item.isoCode === country)[0];
  }, [country]);

  const { mutateAsync } = useMutation(googleSignUp, {
    onSuccess: async () => {
      try {
        navigation.navigate('Loading', { data: { email: values.email, name: values.name, photo: values.photo } });
      } catch (error) {
        console.error('Error al iniciar sesión después de registrarse', error);
      }
    },
  });

  const handleSignUp = async () => {
    console.log('values=> ', countrySelected);
    await mutateAsync({
      ...values,
      country: countrySelected.countryName,
      countryCode: countrySelected.isoCode,
      currencyCountry: countrySelected.countryName,
    });
  };

  const handleValues = (field: string, value: string) => {
    return setValues({ ...values, [field]: value });
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={white} barStyle={statusBarStyle} />
      <BackHeaderTitle
        label={'Crear Cuenta'}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: 30,
          marginVertical: 40,
        }}
      >
        <View>
          <CommonInput
            placeholder='¿Como te llamas?'
            name='Nombre'
            value={values.name}
            setValue={name => handleValues('name', name)}
          />
          <Spacer height={20} />
          <PhoneInput
            value={values.cellphone}
            setValue={text => setValues(prev => ({ ...prev, cellphone: text }))}
            countryCode={country}
            setCountryCode={value => setCountry(value)}
            name={t('more_screen.user_data.phone')}
            placeholder={t('auth_stack.sign_up.placeholder_phone')}
            marginBottom={25}
          />
          <Spacer height={20} />
          <CommonInput
            placeholder='Ingresa tu email'
            keyboardType='email-address'
            name='Email'
            value={values.email}
            setValue={email => handleValues('email', email)}
          />
        </View>
        <Button text='Continuar' onPress={handleSignUp} style={{ backgroundColor: mainColor }}></Button>
      </View>
    </ScreenContainer>
  );
};

export default RegisterScreen;
