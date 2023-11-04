import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, Share } from 'react-native';
import Spacer from '../../components/common/Spacer';
import OptionCard from '../../components/common/OptionCard';
import Right from 'react-native-vector-icons/Entypo';
import Business from 'react-native-vector-icons/FontAwesome';
import Logout from 'react-native-vector-icons/AntDesign';
import Truck from 'react-native-vector-icons/Feather';
import Flag from 'react-native-vector-icons/MaterialIcons';
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

const { textBlack, marginHorizontal, babyBlue, expense } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getEmail();
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('userInfo');
    queryClient.invalidateQueries(VERIFY_TOKEN);
    queryClient.clear();
  };

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message:
          'Hola! Te invito a probar Maui, una app para administrar tus finanzas y llevar a otro nivel tu negocio.',
        url: 'https://maui-app.com/',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartido en una plataforma específica (result.activityType)
        } else {
          // Compartido con éxito
        }
      } else if (result.action === Share.dismissedAction) {
        // Compartir cancelado
      }
    } catch (error) {
      // Manejo de errores
      console.error(error);
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
          <Text
            style={{
              color: textBlack,
              fontFamily: 'Gilroy-Regular',
              marginTop: 5,
              fontSize: 18,
            }}
          >
            {email}
          </Text>
          <Spacer height={20} />
        </View>
        <View style={{ marginHorizontal: marginHorizontal }}>
          <Spacer height={30} />
          <OptionCard
            title={t('more_screen.profile')}
            onPress={() => navigation.navigate('UserData', { data, email })}
            arrow={<Right name='chevron-small-right' color={textBlack} size={30} />}
            icon={<Truck name='user' color={textBlack} size={24} />}
          />
          <Spacer height={10} />
          <OptionCard
            title={t('more_screen.clients')}
            onPress={() => navigation.navigate('Clients')}
            arrow={<Right name='chevron-small-right' color={textBlack} size={30} />}
            icon={<Logout name='contacts' color={textBlack} size={24} />}
          />
          <Spacer height={10} />
          <OptionCard
            title={t('more_screen.providers')}
            onPress={() => navigation.navigate('Providers')}
            arrow={<Right name='chevron-small-right' color={textBlack} size={30} />}
            icon={<Truck name='truck' color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionLanguage
            title={t('more_screen.languages')}
            icon={<Flag name='language' color={textBlack} size={22} />}
            options={languageList}
            modalVisible={isVisible}
            setModalVisible={setIsVisible}
          />
          <Spacer height={10} />
          <OptionCard
            onPress={shareLink}
            title={'Invitar a un amigo'}
            icon={<Right name='share' color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            onPress={() => navigation.navigate('Providers')}
            title={t('more_screen.whatsapp')}
            icon={<Business name='whatsapp' color={textBlack} size={22} />}
          />
          <Spacer height={10} />
          <OptionCard
            style={{ color: expense }}
            title={t('more_screen.log_out')}
            onPress={() => handleLogout()}
            icon={<Logout name='logout' color={expense} size={20} />}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default More;
