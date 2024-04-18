import { View, Text } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import customStyles from '../../../styles/customStyles';
import Button from '../Button';

interface Props {
  title: string;
  description: string;
  isVisible: boolean;
  confirm: () => void;
  confirmLabel: string;
  cancel: () => void;
  cancelLabel: string;
}

const { mainColor, textBlack, background, textLight, secondaryColor, expense } = customStyles;

const AlertModal = ({ title, description, isVisible, confirm, confirmLabel, cancel, cancelLabel }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriverForBackdrop={true}
      onBackdropPress={cancel}
      onBackButtonPress={cancel}
      onSwipeComplete={cancel}
      swipeDirection='down'
      animationOut='slideOutUp'
      animationIn='slideInDown'
    >
      <View
        style={{
          backgroundColor: background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 30,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Gilroy-SemiBold',
            color: textBlack,
            marginBottom: 20,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Gilroy-Medium',
            color: textLight,
            marginBottom: 10,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          {description}
        </Text>
        <Button
          onPress={confirm}
          text={confirmLabel || 'Confirm'}
          style={{
            backgroundColor: secondaryColor,
            width: '100%',
            height: 50,
            marginTop: 20,
          }}
          color={expense}
        />
        <Button
          onPress={cancel}
          text={cancelLabel || 'Cancel'}
          style={{
            backgroundColor: mainColor,
            width: '100%',
            height: 50,
            marginTop: 10,
          }}
        />
      </View>
    </Modal>
  );
};

export default AlertModal;
