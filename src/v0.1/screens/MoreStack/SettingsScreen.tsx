import { useEffect, useState } from 'react';
import { Text, View, StatusBar, Linking } from 'react-native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import { t } from 'i18next';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../../components/common/Spacer';
import OptionCard from '../../components/common/OptionCard';
import OptionLanguage from '../../components/common/OptionLanguage';
import { languageList } from '../../helpers/languageList';
import customStyles from '../../styles/customStyles';
import useGetAccount from '../../services/Account/useGetAccount';
import { showToast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import usePutAccount from '../../services/Account/usePutAccount';
import useGetLinks from '../../services/Links/useGetLinks';
import { ILink, ILinkType } from '../../types/types';

const statusBarStyle = 'dark-content';
const { textBlack, marginHorizontal, disabled } = customStyles;

interface SettingsProps {
  navigation: any;
}
export default function Settings({ navigation }: SettingsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { i18n } = useTranslation();
  const { data: user } = useGetAccount();

  const { data: links } = useGetLinks();

  const playStoreLink = links?.find((link: ILink) => link.name.toUpperCase() === ILinkType.PLAYSTORE)?.url as string;

  const { mutateAsync: editAccount } = usePutAccount({
    onSuccess: () => {
      showToast(t('more_screen.user_data.toast_edit_message'));
    },
  });

  const handleOpenLink = async () => {
    const supported = await Linking.canOpenURL(playStoreLink);
    if (supported) {
      await Linking.openURL(playStoreLink);
    } else {
      console.error('Cannot open the link: ', playStoreLink);
    }
  };

  useEffect(() => {
    if (user && user.language !== i18n.language) {
      editAccount({
        data: {
          language: i18n.language,
        },
      });
    }
  }, [i18n.language]);

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor='white' />
      <BackHeaderTitle label={t('more_screen.config.title')} onPressBack={() => navigation.goBack()} />

      <View style={{ marginHorizontal: marginHorizontal }}>
        <Spacer height={10} />
        <Text
          style={{
            color: textBlack,
            fontFamily: 'Gilroy-Medium',
            fontSize: 16,
          }}
        >
          {t('more_screen.config.section_1.header')}
        </Text>
        <Spacer height={10} />
        <View style={{ height: 1, width: '100%', backgroundColor: disabled }} />
        <Spacer height={10} />
        <OptionLanguage
          title={t('more_screen.config.section_1.languages')}
          icon={<MaterialIcons name='language' color={textBlack} size={22} />}
          options={languageList}
          modalVisible={isVisible}
          setModalVisible={setIsVisible}
        />
        <Spacer height={10} />
        <OptionCard
          title={t('more_screen.config.section_1.feedback')}
          icon={<Feather name='star' color={textBlack} size={22} />}
          onPress={handleOpenLink}
        />
        <Spacer height={20} />
      </View>
    </ScreenContainer>
  );
}
