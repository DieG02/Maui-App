import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customStyles from '../../../styles/customStyles';
import { useTranslation } from 'react-i18next';
import { IFinancialAccount } from '../../../types/types';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useDeleteFinancialAccount from '../../../services/FinancialAccount/useDeleteFinancialAccount';
import { alertDelete } from '../../../utils/alerts';
import { queryClient } from '../../../utils/queryClient';
import { GET_ALL_ACCOUNTS_KEY } from '../../../services/FinancialAccount/useGetAllAccounts';
import { GET_ACCOUNT_TRANSACTIONS_KEY } from '../../../services/Transactions/useGetAccountTransactions';
import { GET_TRANSACTIONS_KEY } from '../../../services/Transactions/useGetAllTransactions';
import { GET_GENERAL_BALANCE_KEY } from '../../../services/Balance/useGeneralBalance';
import { GET_MONTHLY_BALANCE_KEY } from '../../../services/Balance/useGetMonthlyBalance';
import { GET_MONTHLY_STATS_KEY } from '../../../services/Balance/useMonthlyStats';
import LoadingComponent from '../LoadingComponent';

const { background, textBlack, background2, expense, mainColor } = customStyles;

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
}

const UpdateAccountModal = ({ account: { mainAccount, id }, isModalVisible, setModalVisible }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const hideModal = () => setModalVisible(false);
  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('account_stack.account_detail.toast_account_delete'),
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  const { mutateAsync: deleteTransaction, isLoading: isDeleting } = useDeleteFinancialAccount(id, {
    onSuccess() {
      // hideModal();
      navigation.goBack();
      showToast();
      queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
      queryClient.invalidateQueries(GET_ALL_ACCOUNTS_KEY);
      queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
      queryClient.invalidateQueries(GET_ACCOUNT_TRANSACTIONS_KEY);
      queryClient.invalidateQueries(GET_MONTHLY_STATS_KEY);
      queryClient.invalidateQueries(GET_MONTHLY_BALANCE_KEY);
    },
  });

  const handleUpdateAccount = () => {};
  const handleRedirect = () => {
    navigation.navigate('MonthlySummaries', { id });
  };
  const handleDeleteAccount = () => {
    alertDelete(t('account_stack.account_detail.alert_delete'), deleteTransaction);
  };

  const options = [
    {
      title: 'Set as main account',
      icon: 'build-outline',
      label: 'Balances will be converted to this currency',
      color: textBlack,
      allowInMainAccount: false,
      onPress: handleUpdateAccount,
    },
    {
      title: 'Balance History',
      icon: 'reader-outline',
      label: 'Show balances by mounth',
      color: textBlack,
      allowInMainAccount: true,
      onPress: handleRedirect,
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

  if (isDeleting) return <LoadingComponent color={mainColor} />;
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
