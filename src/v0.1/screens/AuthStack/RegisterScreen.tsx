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
import { getCountry } from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../../components/common/Modals/CountrySelect';
import useGetCountries from '../../services/Countries/useGetCountries';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useGetCountryCode from '../../services/CountryCode/useGetCountryCode';
import { ICountry, ICountryCode } from '../../types/types';
import useSignupGoogle from '../../services/Auth/useSignUpGoogle';

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
  language: string;
  country: string;
  photo: string;
}

const initialValues = {
  email: '',
  name: '',
  cellphone: '',
  countryCode: '',
  language: '',
  country: '',
  photo: '',
};

const RegisterScreen = ({ route, navigation }: Props) => {
  const { params } = route;
  const currentCountry = getCountry();
  const [country, setCountry] = useState<string>(currentCountry);
  const [selectedCountry, setSelectedCountry] = useState<string>(currentCountry);
  const { t, i18n } = useTranslation();

  const { setValues, values } = useForm<RegisterUser>({
    ...initialValues,
    email: params?.user.email,
    name: params?.user.name,
    photo: params?.user.photo,
  });

  const { data: countries } = useGetCountries();
  const { data: countryCodes } = useGetCountryCode();

  const selectCountryList = useMemo(() => {
    return countries?.filter(item => item.isoCode === selectedCountry)[0];
  }, [selectedCountry]);

  const { mutateAsync: mutateAsync } = useSignupGoogle(
    {
      ...values,
      country: selectCountryList?.name as string,
      countryCode: selectCountryList?.isoCode as string,
      language: i18n.language,
    },
    {
      onSuccess: async () => {
        try {
          navigation.navigate('Loading', { data: { email: values.email, name: values.name, photo: values.photo } });
        } catch (error) {
          console.error('Error al iniciar sesión después de registrarse', error);
        }
      },
    }
  );

  const handleValues = (field: string, value: string) => {
    return setValues({ ...values, [field]: value });
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={white} barStyle={statusBarStyle} />
      <BackHeaderTitle
        label={'Crear Cuenta'}
        onPressBack={async () => {
          navigation.goBack();
          await GoogleSignin.signOut();
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
            name={t('more_screen.user_data.name')}
            value={values.name}
            setValue={name => handleValues('name', name)}
          />
          <Spacer height={20} />
          <CountrySelect
            name='Country'
            selectedOption={selectedCountry}
            setSelectedOption={setSelectedCountry}
            options={countries as ICountry[]}
          />
          <Spacer height={20} />
          <PhoneInput
            value={values.cellphone}
            setValue={text => setValues(prev => ({ ...prev, cellphone: text }))}
            countryCode={country}
            setCountryCode={value => setCountry(value)}
            name={t('more_screen.user_data.phone')}
            placeholder={t('auth_stack.sign_up.placeholder_phone')}
            marginBottom={20}
            options={countryCodes as ICountryCode[]}
          />
          <CommonInput
            placeholder='Ingresa tu email'
            keyboardType='email-address'
            name='Email'
            editable={false}
            value={values.email}
            setValue={email => handleValues('email', email)}
          />
        </View>
        <Button text='Continuar' onPress={() => mutateAsync()} style={{ backgroundColor: mainColor }}></Button>
      </View>
    </ScreenContainer>
  );
};

export default RegisterScreen;
