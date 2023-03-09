import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import customStyles from '../../../styles/customStyles';
import Button from '../Button';

interface Props {
    title: string;
    isVisible: boolean;
    confirm: () => void;
    cancel: () => void;
}

const { mainColor, background, ligthBlue } = customStyles;

const ConfirmationModal = (
    {
        title,
        isVisible,
        cancel,
        confirm
    }: Props) => {

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriverForBackdrop={true}
            onBackdropPress={cancel}
            onBackButtonPress={cancel}
            onSwipeComplete={cancel}
            swipeDirection="down"
            animationOut="slideOutUp"
            animationIn="slideInDown"
        >
            <View
                style={{
                    backgroundColor: background,
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 'auto',
                    paddingVertical: 30,
                    borderRadius: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "Gilroy-SemiBold",
                        color: mainColor,
                        marginBottom: 10
                    }}
                >
                    {title}
                </Text>
                <Button
                    onPress={confirm}
                    text='Confirmar'
                    style={{
                        backgroundColor: mainColor,
                        width: '80%',
                        marginTop: 15
                    }}
                />
                <Button
                    onPress={cancel}
                    text='Cancelar'
                    style={{
                        backgroundColor: ligthBlue,
                        width: '80%',
                        marginTop: 15,
                    }}
                    color={mainColor}
                />
            </View>
        </Modal>
    );
}

export default ConfirmationModal