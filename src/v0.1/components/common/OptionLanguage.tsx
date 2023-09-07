import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LanguageModal from './Modals/LanguageModal';
import customStyles from '../../styles/customStyles';

type OptionLanguage = {
  modalVisible: boolean;
  setModalVisible: (item: boolean) => void;
  options: Options[];
  title: string;
  icon: React.ReactNode;
};

const { textBlack, background2 } = customStyles;

const OptionLanguage = ({ modalVisible, setModalVisible, options, title, icon }: OptionLanguage) => {
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 60,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              marginRight: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: background2,
            }}
          >
            {icon}
          </View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      <LanguageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        options={options}
        storeInLocalStorage
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: textBlack,
    fontFamily: 'Gilroy-Medium',
  },
});

export default OptionLanguage;
