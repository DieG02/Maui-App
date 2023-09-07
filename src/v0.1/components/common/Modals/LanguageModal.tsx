import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import LanguageOption from '../LanguageOption';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../../hooks/useLocalStorage';

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  options: Options[];
  storeInLocalStorage?: boolean;
}

const LanguageModal = ({ modalVisible, setModalVisible, options, storeInLocalStorage }: Props) => {
  const { i18n } = useTranslation();
  const { modifyData } = useLocalStorage();

  const handleOnPress = (locale: string) => {
    i18n.changeLanguage(locale);

    if (storeInLocalStorage) {
      modifyData('locale', locale);
    }
    setModalVisible(false);
  };

  return (
    <Modal
      scrollOffset={100}
      isVisible={modalVisible}
      useNativeDriverForBackdrop={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
    >
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 10,
          borderRadius: 15,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          {options.map(({ locale, flag, label }) => (
            <LanguageOption key={locale} label={label} flag={flag} onPress={() => handleOnPress(locale)} />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;
