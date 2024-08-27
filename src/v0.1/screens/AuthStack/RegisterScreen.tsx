import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, View } from 'react-native';
import { getCountry } from 'react-native-localize';
import Button from '../../components/common/Button';
import CommonInput from '../../components/common/CommonInput';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import CountrySelect from '../../components/common/Modals/CountrySelect';
import OverlayLoading from '../../components/common/OverlayLoading';
import PhoneInput from '../../components/common/PhoneInput';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import useForm from '../../hooks/useForm';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import useLoginGoogle from '../../services/Auth/useLoginGoogle';
import useSignupGoogle from '../../services/Auth/useSignUpGoogle';
import useGetCountries from '../../services/Countries/useGetCountries';
import useGetCountryCode from '../../services/CountryCode/useGetCountryCode';
import customStyles from '../../styles/customStyles';
import { ICountry, ICountryCode } from '../../types/types';
import { queryClient } from '../../utils/queryClient';

const { white, mainColor, background2 } = customStyles;
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

const toValidate = ['name'];

const RegisterScreen = ({ route, navigation }: Props) => {
  const { params } = route;
  const currentCountry = getCountry();

  const [country, setCountry] = useState<string>(currentCountry);
  const [selectedCountry, setSelectedCountry] = useState<string>(currentCountry);
  const { t, i18n } = useTranslation();

  const { setValues, values, validateValues } = useForm<RegisterUser>({
    ...initialValues,
    email: params?.user.email,
    name: params?.user.name,
    photo: params?.user.photo,
  });

  const { data: countries } = useGetCountries();
  const { data: countryCodes } = useGetCountryCode();

  const selectCountryList = useMemo(() => {
    return countries?.filter(item => item.isoCode === selectedCountry)[0];
  }, [selectedCountry, countries]);

  const { mutateAsync: googleLogin } = useLoginGoogle({
    onSuccess: async data => {
      await GoogleSignin.signIn();
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      queryClient.invalidateQueries(VERIFY_TOKEN);
    },
  });
  const { mutateAsync, isLoading } = useSignupGoogle(
    {
      ...values,
      country: selectCountryList?.name as string,
      countryCode: selectCountryList?.isoCode as string,
      language: i18n.language,
    },
    {
      onSuccess: async data => {
        try {
          await googleLogin({
            data: {
              name: data.name,
              email: data.email,
              authSource: 'GOOGLE',
              photo: data.photo,
            },
          });
        } catch (error) {
          console.error('Something went wrong', error);
        }
      },
    }
  );

  const handleValues = (field: string, value: string) => {
    return setValues({ ...values, [field]: value });
  };

  return (
    <ScreenContainer>
      <OverlayLoading isLoading={isLoading} />
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
            placeholder={t('auth_stack.sign_up.placeholder_name')}
            name={t('more_screen.user_data.name')}
            value={values.name}
            setValue={name => handleValues('name', name)}
          />
          <Spacer height={20} />
          <CountrySelect
            name={t('more_screen.user_data.country')}
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
            keyboardType='email-address'
            name='Email'
            editable={false}
            value={values.email}
            setValue={email => handleValues('email', email)}
          />
        </View>
        <Button
          disabled={!validateValues(toValidate)}
          onPress={() => mutateAsync()}
          text={t('auth_stack.sign_up.continue')}
          color={validateValues(toValidate) ? white : mainColor}
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : background2,
            borderRadius: 25,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default RegisterScreen;
