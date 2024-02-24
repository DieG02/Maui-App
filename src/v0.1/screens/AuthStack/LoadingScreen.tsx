import { View } from 'react-native';
import React from 'react';
import { NavigationProp, RouteProp, StackActions } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import { useQuery } from 'react-query';
import { googleLogin } from '../../services/GoogleAuth/googleLogIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryClient } from '../../utils/queryClient';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image } from 'react-native';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const LoadingScreen = ({ route, navigation }: Props) => {
  const { params } = route;

  const payload = {
    name: params?.data.name,
    email: params?.data.email,
    authSource: 'GOOGLE',
    photo: params?.data.photo,
  };

  useQuery('GOOGLE_LOGIN', () => googleLogin(payload), {
    onSuccess: async data => {
      try {
        if (data.screenRedirect === 'Register') {
          navigation.dispatch(StackActions.replace(data.screenRedirect, { user: data }));
        } else {
          await GoogleSignin.signIn();
          await AsyncStorage.setItem('userInfo', JSON.stringify(data));
          queryClient.invalidateQueries(VERIFY_TOKEN);
        }
      } catch (error) {
        console.error('Algo salio mal', error);
      }
    },
  });

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
};

export default LoadingScreen;
