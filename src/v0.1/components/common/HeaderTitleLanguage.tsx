import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import Icon from './Icon';
import Arrow from 'react-native-vector-icons/Ionicons';
import LanguageModal from './Modals/LanguageModal';
import { useTranslation } from 'react-i18next';

const { background, white, textBlack, background2 } = customStyles;

interface SimpleProps {
  label: string;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  options: Options[];
}

interface Props extends SimpleProps {
  onPressBack: () => void;
  hasType?: boolean;
  color?: string;
  headerStyle?: {};
}

export const HeaderTitle = ({ label }: SimpleProps) => {
  return (
    <View
      style={{
        backgroundColor: background,
        height: 60,
        paddingLeft: 20,
        justifyContent: 'space-between',
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'Gilroy-Bold',
          color: textBlack,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export const BackHeaderTitleLanguage = ({
  label,
  onPressBack,
  hasType,
  color,
  headerStyle,
  modalVisible,
  setModalVisible,
  options,
}: Props) => {
  const { i18n } = useTranslation();
  const currentLocale = options.find(({ locale }) => i18n.language === locale);
  return (
    <View
      style={[
        {
          backgroundColor: hasType ? color : background,
          height: 60,
          paddingLeft: 10,
          justifyContent: 'space-between',
          paddingRight: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
        headerStyle,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon onPress={onPressBack}>
          <Arrow name='arrow-back' size={30} color={hasType ? white : textBlack} />
        </Icon>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Bold',
            color: hasType ? white : textBlack,
            paddingLeft: 10,
          }}
        >
          {label}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: background2,
          borderRadius: 25,
          width: 45,
          height: 45,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={currentLocale?.flag as ImageSourcePropType} style={{ width: 26, height: 26 }} />
      </TouchableOpacity>
      <LanguageModal modalVisible={modalVisible} setModalVisible={setModalVisible} options={options} />
    </View>
  );
};
