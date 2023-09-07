import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import customStyles from '../../../v0.1/styles/customStyles'
import { checkCameraPermission, requestCameraPermission } from '../../../v0.1/requests'
import Pencil from "react-native-vector-icons/Entypo";
import ImageModal from "../../../v0.1/components/common/Modals/ImageModal";
import ImagePicker from 'react-native-image-crop-picker';
import { editUserAccountBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";

interface Props {
    setValues: React.Dispatch<any>;
    values: editUserAccountBodyInputDto;
}

const { mainColor, background2 } = customStyles;

const openCamera = async () => {
    const photo = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
    });

    return photo;
};

const PencilImageInput = ({ values, setValues }: Props) => {

    const [isVisible, setVisible] = useState(false);
    const toggleModal = () => {
        setVisible(!isVisible);
    };

    const pickImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            })
            setValues({ ...values, image: image.path })
            toggleModal();
        } catch (error) {
            console.log(error);
            toggleModal();
        }
    };

    const takePhoto = async () => {
        try {
            const hasPermission = await checkCameraPermission();
            if (hasPermission){
                const image = await openCamera()
                setValues({ ...values, image: image.path })
                toggleModal()
            } else {
                await requestCameraPermission();
                const image = await openCamera()
                setValues({ ...values, image: image.path })
                toggleModal()
            }
        } catch (error) {
            console.log(error);
            toggleModal()
        }
    }

    return (
        <TouchableOpacity
            style={{
                top: -30,
                marginHorizontal: "55%",
                borderRadius: 50,
                backgroundColor: background2,
                width: 35,
                height: 35,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: -30
            }}
            onPress={toggleModal}
        >
            <Pencil name='pencil' size={18} color={mainColor} />
            <ImageModal
                isVisible={isVisible}
                setVisible={toggleModal}
                takePhoto={takePhoto}
                pickImage={pickImage}
            />
        </TouchableOpacity>
    )
}

export default PencilImageInput