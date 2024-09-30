import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customStyles from '../../../styles/customStyles';
import { IFinancialAccount } from '../../../types/types';
import { alertDelete, alertUpdate } from '../../../utils/alerts';

const { background, textBlack, background2, expense } = customStyles;

type OptionsType = {
  title: string;
  icon: string;
  label: string;
  color: string;
  allowInMainAccount: boolean;
  onPress: () => void;
};

interface Props {
  account: IFinancialAccount;
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onUpdate: () => void;
  onRedirect: () => void;
  onDelete: () => void;
}

const UpdateAccountModal = ({
  account: { mainAccount },
  isModalVisible,
  setModalVisible,
  onUpdate,
  onRedirect,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const hideModal = () => setModalVisible(false);

  const handleUpdateAccount = () => {
    alertUpdate(t('account_stack.account_detail.alert_edit'), onUpdate);
  };

  const handleDeleteAccount = () => {
    alertDelete(t('account_stack.account_detail.alert_delete'), onDelete);
  };

  const options = [
    {
      title: t('account_stack.setting_options.update.item'),
      label: t('account_stack.setting_options.update.info'),
      icon: 'build-outline',
      color: textBlack,
      allowInMainAccount: false,
      onPress: handleUpdateAccount,
    },
    {
      title: t('account_stack.setting_options.history.item'),
      label: t('account_stack.setting_options.history.info'),
      icon: 'reader-outline',
      color: textBlack,
      allowInMainAccount: true,
      onPress: onRedirect,
    },
    {
      title: t('account_stack.setting_options.delete.item'),
      label: t('account_stack.setting_options.delete.info'),
      icon: 'trash-outline',
      color: expense,
      allowInMainAccount: false,
      onPress: handleDeleteAccount,
    },
  ];
  const filteredArray = mainAccount ? options.filter(({ allowInMainAccount }) => !!allowInMainAccount) : options;

  const ModalItem = ({ title, icon, label, color, onPress }: OptionsType) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: background2,
          borderRadius: 12,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
        onPress={onPress}
      >
        <Ionicons name={icon} size={24} color={color} />

        <View style={{ rowGap: 5 }}>
          <Text
            style={{
              marginLeft: 15,
              color: color,
              fontSize: 18,
              fontFamily: 'Gilroy-SemiBold',
            }}
          >
            {title}
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
            {t('account_stack.setting_options.title')}
          </Text>
          <Text
            style={{
              color: textBlack,
              fontFamily: 'Gilroy-Medium',
              marginBottom: 15,
              fontSize: 16,
            }}
          >
            {t('account_stack.setting_options.body')}
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomEndRadius: Platform.OS === 'ios' ? 30 : 0,
    borderBottomStartRadius: Platform.OS === 'ios' ? 30 : 0,
    paddingBottom: 40,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});

export default UpdateAccountModal;
