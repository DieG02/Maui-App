import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Modal from 'react-native-modal';
import customStyles from '../../../styles/customStyles';
import { IFinancialAccount } from '../../../types/types';
import { useTranslation } from 'react-i18next';

const { background, textBlack, background2, itemLight } = customStyles;

interface Props {
  data: IFinancialAccount[];
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selected: IFinancialAccount;
  setSelected: (value: IFinancialAccount) => void;
}

const AccountModal = ({ data, isModalVisible, setModalVisible, selected, setSelected }: Props) => {
  const handleAccount = (account: IFinancialAccount) => {
    setSelected(account);
    setModalVisible(false);
  };
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      swipeDirection={['down']}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <View
        style={{
          backgroundColor: background,
          height: data.length * 80 + 120,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomEndRadius: Platform.OS === 'ios' ? 30 : 0,
          borderBottomStartRadius: Platform.OS === 'ios' ? 30 : 0,
        }}
      >
        <View
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View>
            <Text
              style={{
                color: textBlack,
                fontSize: 20,
                fontFamily: 'Gilroy-Bold',
                marginHorizontal: 20,
                marginBottom: 20,
              }}
            >
              {t('account_stack.account_detail.title')}
            </Text>
            <Text
              style={{
                color: textBlack,
                fontFamily: 'Gilroy-Medium',
                marginHorizontal: 20,
                marginBottom: 20,
              }}
            >
              {t('account_stack.account_detail.body')}
            </Text>
          </View>

          {data.map((account: IFinancialAccount) => {
            return (
              <TouchableOpacity
                onPress={() => handleAccount(account)}
                key={account.id}
                style={{
                  backgroundColor: selected.id === account.id ? itemLight : background2,
                  height: 60,
                  borderRadius: 12,
                  marginHorizontal: 20,
                  marginVertical: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  paddingLeft: 15,
                  width: '90%',
                }}
              >
                <CountryFlag
                  isoCode={account.currency.isoCode}
                  size={40}
                  style={{
                    marginVertical: 5,
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    rowGap: 5,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 15,
                      color: textBlack,
                      fontSize: 18,
                      fontFamily: 'Gilroy-SemiBold',
                    }}
                  >
                    {account.currency.code}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: textBlack,
                      fontFamily: 'Gilroy-Regular',
                    }}
                  >
                    {account.accountName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default AccountModal;
