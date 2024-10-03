import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { version as AppVersion } from '../../../../package.json';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import OptionCard from '../../components/common/OptionCard';
import Spacer from '../../components/common/Spacer';
import ScreenContainer from '../../components/containers/ScreenContainer';
import ProfileBadge from '../../components/Library/ProfileBadge';
import { AuthContext } from '../../context/AuthContext';
import useGetAccount from '../../services/Account/useGetAccount';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import useGetLinks from '../../services/Links/useGetLinks';
import { GET_SUBSCRIPTION_CAPABILITIES_KEY } from '../../services/SuscriptionCapabilities/useGetCapabilities';
import customStyles from '../../styles/customStyles';
import { IAccount, ILink, ILinkType } from '../../types/types';
import { Clipboard } from '../../utils/ClipBoard';
import { queryClient } from '../../utils/queryClient';

const { textBlack, marginHorizontal, babyBlue, expense } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const versionName = Platform.select({
  android: AppVersion,
  ios: AppVersion,
});

const More = ({ navigation }: Props) => {
  const { data: links } = useGetLinks();

  const playStoreLink = links?.find((link: ILink) => link.name.toUpperCase() === ILinkType.PLAYSTORE)?.url as string;

  const whatsAppLink = links?.find((link: ILink) => link.name.toUpperCase() === ILinkType.WHATSAPP)?.url as string;

  const appStoreLink = links?.find((link: ILink) => link.name.toUpperCase() === ILinkType.APPSTORE)?.url as string;

  const { setIsLoggedIn } = useContext(AuthContext);
  const { data, refetch } = useGetAccount();
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const getEmail = async () => {
    const storage = await AsyncStorage.getItem('userInfo');
    const email = storage ? JSON.parse(storage).email : '';
    return setEmail(email);
  };

  const handleClipboard = () => {
    Clipboard.setString(email);
    Toast.show({
      type: 'success',
      text2: t('more_screen.toast_copy_email'),
      position: 'top',
      visibilityTime: 1000,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getEmail();
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    const isSignedInGoogle = await GoogleSignin.isSignedIn();
    isSignedInGoogle && (await GoogleSignin.signOut());
    await AsyncStorage.removeItem('userInfo');
    queryClient.invalidateQueries(GET_SUBSCRIPTION_CAPABILITIES_KEY);
    queryClient.invalidateQueries(VERIFY_TOKEN);
    queryClient.clear();
  };
  const shareLink = async () => {
    const store = Platform.OS === 'ios' ? appStoreLink : playStoreLink;
    const isAndroid = Platform.OS === 'android' ? playStoreLink : '';

    const options = {
      title: t('more_screen.title_share'),
      message: `${t('more_screen.message_share')}\n\n${isAndroid}`,
      url: store,
    };

    try {
      await Share.share(options);
    } catch (error) {
      console.error(error);
    }
  };

  const openWhatsApp = async () => {
    try {
      await Linking.openURL(whatsAppLink);
    } catch (err) {
      console.error('An error occurred', err);
    }
  };

  return (
    <ScreenContainer>
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
        <ProfileBadge user={data as IAccount} size='large' />
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
          <Text
            style={{
              color: textBlack,
              fontFamily: 'Gilroy-Regular',
              fontSize: 18,
            }}
          >
            {email}
          </Text>
          <Feather name='clipboard' color={textBlack} size={16} style={{ paddingLeft: 5 }} />
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
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
        <View style={{ marginHorizontal: marginHorizontal }}>
          <Spacer height={20} />
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
            icon={<MaterialIcons name='perm-contact-cal' color={textBlack} size={24} />}
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
            icon={<MaterialIcons name='logout' color={expense} size={20} />}
          />
          <Spacer height={10} />
          <View>
            <Text
              style={{
                color: textBlack,
                opacity: 0.8,
                fontFamily: 'Gilroy-Regular',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              Version {versionName}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default More;
