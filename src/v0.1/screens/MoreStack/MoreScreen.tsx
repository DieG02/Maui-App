import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, Share, Linking, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Spacer from '../../components/common/Spacer';
import OptionCard from '../../components/common/OptionCard';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import ProfileBadge from '../../components/Library/ProfileBadge';
import customStyles from '../../styles/customStyles';
import useGetAccount from '../../services/Account/useGetAccount';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';
import OptionLanguage from '../../components/common/OptionLanguage';
import { languageList } from '../../helpers/languageList';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { textBlack, marginHorizontal, babyBlue, expense } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const whatsappLink = 'https://wa.me/541169708424';

const url = 'https://play.google.com/store/apps/details?id=com.maui.app.company&pcampaignid=web_share';

// Llama a la función para abrir el enlace cuando sea necesario

const More = ({ navigation }: Props) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { data, refetch } = useGetAccount();
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const getEmail = async () => {
    const storage = await AsyncStorage.getItem('userInfo');
    const email = storage ? JSON.parse(storage).email : '';
    return setEmail(email);
  };

  const handleClipboard = () => {
    Clipboard.setString(email);
    ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getEmail();
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    const isSignedInGoogle = await GoogleSignin.isSignedIn();
    isSignedInGoogle && (await GoogleSignin.signOut());
    await AsyncStorage.removeItem('userInfo');
    queryClient.invalidateQueries(VERIFY_TOKEN);
    queryClient.clear();
  };
  const shareLink = async () => {
    const options = {
      title: t('more_screen.title_share'),
      message: `${t('more_screen.message_share')}\n\n${url}`,
      url: url,
    };

    try {
      await Share.share(options);
    } catch (error) {
      console.error(error);
    }
  };

  const openWhatsApp = async () => {
    try {
      const supported = await Linking.openURL(whatsappLink);
      if (!supported) {
        console.log('WhatsApp is not installed');
        Alert.alert('No app can handle the message link');
      }
    } catch (err) {
      console.error('An error occurred', err);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeaderTitle
          label=''
          onPressBack={() => navigation.goBack()}
          headerStyle={{
            backgroundColor: babyBlue,
          }}
        />
        <View
          style={{
            backgroundColor: babyBlue,
            alignItems: 'center',
          }}
        >
          <ProfileBadge user={data} size='large' />
          <Text
            style={{
              fontSize: 25,
              color: textBlack,
              fontFamily: 'Gilroy-Medium',
              marginTop: 10,
            }}
          >
            {data?.name}
          </Text>
          <TouchableOpacity
            onPress={handleClipboard}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Feather name='clipboard' color={textBlack} size={16} style={{ paddingRight: 5 }} />
            <Text
              style={{
                color: textBlack,
                fontFamily: 'Gilroy-Regular',
                fontSize: 18,
              }}
            >
              {email}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: textBlack,
              fontFamily: 'Gilroy-Regular',
              marginTop: 5,
              fontSize: 18,
            }}
          >
            {data?.country}
          </Text>
          <Spacer height={20} />
        </View>
        <View style={{ marginHorizontal: marginHorizontal }}>
          <Spacer height={30} />
          <OptionCard
            title={t('more_screen.profile')}
            onPress={() => navigation.navigate('UserData', { data, email })}
            arrow={<Entypo name='chevron-small-right' color={textBlack} size={30} />}
            icon={<Feather name='user' color={textBlack} size={24} />}
          />
          <Spacer height={10} />
          <OptionCard
            title={t('more_screen.clients')}
            onPress={() => navigation.navigate('Clients')}
            arrow={<Entypo name='chevron-small-right' color={textBlack} size={30} />}
            icon={<AntDesign name='contacts' color={textBlack} size={24} />}
          />
          <Spacer height={10} />
          <OptionCard
            title={t('more_screen.providers')}
            onPress={() => navigation.navigate('Providers')}
            arrow={<Entypo name='chevron-small-right' color={textBlack} size={30} />}
            icon={<Feather name='truck' color={textBlack} size={22} />}
          />

          <Spacer height={10} />
          <OptionCard
            title={t('more_screen.settings')}
            icon={<Feather name='settings' color={textBlack} size={22} />}
            onPress={() => navigation.navigate('Settings')}
            arrow={<Entypo name='chevron-small-right' color={textBlack} size={30} />}
          />

          <Spacer height={10} />
          <OptionCard
            onPress={shareLink}
            title={t('more_screen.share_link')}
            icon={<Entypo name='share' color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            onPress={openWhatsApp}
            title={t('more_screen.whatsapp')}
            icon={<FontAwesome name='whatsapp' color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            style={{ color: expense }}
            title={t('more_screen.log_out')}
            onPress={() => handleLogout()}
            icon={<AntDesign name='logout' color={expense} size={20} />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default More;
