import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customStyles from '../../../styles/customStyles';
import { useTranslation } from 'react-i18next';
import { IFinancialAccount } from '../../../types/types';
import { alertDelete } from '../../../utils/alerts';

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

  const handleUpdateAccount = () => {};
  const handleDeleteAccount = () => {
    alertDelete(t('account_stack.account_detail.alert_delete'), onDelete);
  };

  const options = [
    {
      title: 'Set as main account',
      icon: 'build-outline',
      label: 'Balances will be converted to this currency',
      color: textBlack,
      allowInMainAccount: false,
      onPress: onUpdate,
    },
    {
      title: 'Balance History',
      icon: 'reader-outline',
      label: 'Show balances by mounth',
      color: textBlack,
      allowInMainAccount: true,
      onPress: onRedirect,
    },
    {
      title: 'Delete Account',
      icon: 'trash-outline',
      label: 'Remove this account permanently',
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
          height: 60,
          borderRadius: 12,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: 15,
        }}
        onPress={onPress}
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
