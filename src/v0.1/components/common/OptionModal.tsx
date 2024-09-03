import React from 'react';
import { ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import customStyles from '../../styles/customStyles';
import OptionSelect from './OptionSelect';
import CommonInput from './CommonInput';
import { useTranslation } from 'react-i18next';

const { mainColor, white, textBlack, selectedItem } = customStyles;

interface Props {
  options: Array<string | { label: string; value: any }>;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  title: string;
  selectedOption: string;
  setSelectedOption: (value: string | { label: string; value: any }) => void;
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

  const handleModal = (option: string | { label: string; value: any }) => {
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
        <ScrollView
          style={{
            backgroundColor: white,
            marginHorizontal: 10,
            borderRadius: 15,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: 10 }}>
            {options?.map((option, index) =>
              typeof option === 'string' ? (
                <OptionSelect
                  key={index}
                  name={t(option)}
                  backgroundColor={selectedOption === option ? selectedItem : white}
                  textColor={selectedOption === option ? mainColor : textBlack}
                  onPress={() => handleModal(option)}
                />
              ) : (
                <OptionSelect
                  key={index}
                  name={t(option.label)}
                  backgroundColor={selectedOption === option.label ? selectedItem : white}
                  textColor={selectedOption === option.label ? mainColor : textBlack}
                  onPress={() => handleModal(option)}
                />
              )
            )}
          </View>
        </ScrollView>
      </Modal>
      <CommonInput
        placeholder={placeholder}
        required={required}
        name={title}
        touchable={true}
        value={selectedOption}
        setValue={setSelectedOption}
        marginBottom={15}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  );
};

export default OptionModal;
