import { View, Text } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import customStyles from '../../../styles/customStyles';
import Button from '../Button';

interface Props {
    isVisible: boolean;
    setVisible: () => void;
    takePhoto: () => void;
    pickImage: () => void;
}

const { mainColor, background, ligthBlue } = customStyles;

const ImageModal = (
    {
        isVisible,
        setVisible,
        takePhoto,
        pickImage
    }: Props) => {

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriverForBackdrop={true}
            onBackdropPress={setVisible}
            onBackButtonPress={setVisible}
            onSwipeComplete={setVisible}
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
                    Actualiza tu Foto
                </Text>
                <Button
                    onPress={takePhoto}
                    text='Tomar una foto'
                    style={{
                        backgroundColor: mainColor,
                        width: '80%',
                        marginTop: 15
                    }}
                />
                <Button
                    onPress={pickImage}
                    text='Escoger una imagen'
                    style={{
                        backgroundColor: mainColor,
                        width: '80%',
                        marginTop: 15
                    }}
                />
                <Button
                    onPress={setVisible}
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

export default ImageModal