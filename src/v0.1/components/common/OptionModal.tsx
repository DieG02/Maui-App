import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import customStyles from '../../styles/customStyles';
import OptionSelect from './OptionSelect';
import CommonInput from './CommonInput';
import { useTranslation } from 'react-i18next';

const { mainColor, ligthBlue, white, textBlack } = customStyles;

interface Props {
  options: Array<string>;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  title: string;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const OptionModal = ({
  options,
  isModalVisible,
  setIsModalVisible,
  title,
  selectedOption,
  setSelectedOption,
  required,
  placeholder,
}: Props) => {
  const { t } = useTranslation();

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
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            borderRadius: 15,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            {options?.map((option, index) => (
              <OptionSelect
                key={index}
                name={t(option)}
                backgroundColor={selectedOption === option ? ligthBlue : white}
                textColor={selectedOption === option ? mainColor : textBlack}
                onPress={() => handleModal(option)}
              />
            ))}
          </View>
        </View>
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

export default OptionModal;
