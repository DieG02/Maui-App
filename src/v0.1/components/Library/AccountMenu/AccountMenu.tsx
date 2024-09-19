import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customStyles from '../../../styles/customStyles';
import { useTranslation } from 'react-i18next';
import { IFinancialAccount } from '../../../types/types';

const { background, textBlack, background2, expense } = customStyles;

const options = [
  {
    title: 'Set as main account',
    icon: 'build-outline',
    label: 'Balances will be converted to this currency',
    color: textBlack,
    allowInMainAccount: false,
  },
  {
    title: 'Balance History',
    icon: 'reader-outline',
    label: 'Show balances by mounth',
    color: textBlack,
    allowInMainAccount: true,
  },
  {
    title: 'Delete Account',
    icon: 'trash-outline',
    label: 'Remove this account permanently',
    color: expense,
    allowInMainAccount: false,
  },
];

type OptionsType = {
  title: string;
  icon: string;
  label: string;
  color: string;
  allowInMainAccount: boolean;
};

interface Props {
  account: IFinancialAccount;
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const UpdateAccountModal = ({ account: { mainAccount }, isModalVisible, setModalVisible }: Props) => {
  const hideModal = () => setModalVisible(false);

  const { t } = useTranslation();
  const filteredArray = mainAccount ? options.filter(({ allowInMainAccount }) => !!allowInMainAccount) : options;

  const ModalItem = ({ title, icon, label, color }: OptionsType) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: background2,
          height: 60,
          borderRadius: 12,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: 15,
        }}
      >
        <Ionicons name={icon} size={24} color={color} />
        <View
          style={{
            rowGap: 5,
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              color: color,
              fontSize: 18,
              fontFamily: 'Gilroy-SemiBold',
            }}
          >
            {t(title)}
          </Text>
          <Text
            style={{
              marginLeft: 15,
              color: textBlack,
              fontFamily: 'Gilroy-Regular',
            }}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      swipeDirection={['down']}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      onBackButtonPress={hideModal}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: textBlack,
              fontSize: 20,
              fontFamily: 'Gilroy-Bold',
              marginBottom: 20,
            }}
          >
            {t('Account')}
          </Text>
          <Text
            style={{
              color: textBlack,
              fontFamily: 'Gilroy-Medium',
              marginBottom: 15,
            }}
          >
            {t('What do you want to do with this account?')}
          </Text>
        </View>

        <View style={{ gap: 15 }}>
          {filteredArray.map((opt, i) => {
            return <ModalItem key={i} {...opt} />;
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: background,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomEndRadius: Platform.OS === 'ios' ? 30 : 0,
    borderBottomStartRadius: Platform.OS === 'ios' ? 30 : 0,
  },
});

export default UpdateAccountModal;
