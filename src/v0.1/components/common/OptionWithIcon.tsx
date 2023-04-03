import React from "react";
import { View, FlatList } from "react-native";
import Modal from "react-native-modal";
import customStyles from "../../styles/customStyles";
import CommonInput from "./CommonInput";
import OptionItemWithIcon from "./OptionItemWithIcon";

const { background, mainColor, itemLight } = customStyles;

interface Props {
    options: Array<any>;
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
    title: string;
    selectedOption: string;
    setSelectedOption: (value: string) => void;
    required?: boolean;
    placeholder?: string;
}

const OptionWithIcon = ({
    options,
    isModalVisible,
    setIsModalVisible,
    title,
    selectedOption,
    setSelectedOption,
    required,
    placeholder,
}: Props) => {
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleModal = (option: string) => {
        setSelectedOption(option);
        toggleModal();
    };

    return (
        <View>
            <Modal
                isVisible={isModalVisible}
                useNativeDriverForBackdrop={true}
                onBackdropPress={() => setIsModalVisible(false)}
                onSwipeComplete={() => setIsModalVisible(false)}
                onBackButtonPress={() => setIsModalVisible(false)}
            >
                <FlatList
                    data={options}
                    keyExtractor={ item => item.id }
                    style={{
                        backgroundColor: background,
                        marginHorizontal: 10,
                        borderRadius: 15,
                        maxHeight: '75%',
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={ ({item: item}) =>
                        <OptionItemWithIcon
                            key={item.id}
                            name={item.name}
                            image={item.imageUrl}
                            backgroundColor={
                            selectedOption === item.name ? itemLight : background
                            }
                            textColor={selectedOption === item.name ? mainColor : "#737373"}
                            onPress={() => handleModal(item.name)}
                        />
                    }
                />
            </Modal>
            <CommonInput
                placeholder={placeholder}
                required={required}
                name={title}
                touchable={true}
                value={selectedOption}
                setValue={setSelectedOption}
                marginBottom={25}
                onPress={() => setIsModalVisible(true)}
            />
        </View>
    );
};

export default OptionWithIcon;
