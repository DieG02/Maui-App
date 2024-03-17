import React, { useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import customStyles from '../../styles/customStyles';
import LanguageModal from './Modals/LanguageModal';
import { languageList } from '../../helpers/languageList';
import useToggle from '../../hooks/useToggle';
import { useTranslation } from 'react-i18next';

const { background2 } = customStyles;

const LanguageButton = () => {
  const { value, toggle, setToggle } = useToggle(false);

  const { i18n } = useTranslation();

  const currentFlag = useMemo(() => {
    return languageList.find(language => language.locale === i18n.language);
  }, [i18n.language]);

  return (
    <View style={{ alignItems: 'flex-end' }}>
      <TouchableOpacity
        onPress={toggle}
        style={{ backgroundColor: background2, marginRight: 25, marginTop: 20, borderRadius: 50, padding: 12 }}
      >
        <Image source={currentFlag?.flag} style={{ height: 25, width: 25 }} />
      </TouchableOpacity>
      <LanguageModal modalVisible={value} setModalVisible={setToggle} options={languageList} storeInLocalStorage />
    </View>
  );
};

export default LanguageButton;
