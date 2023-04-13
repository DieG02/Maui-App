import React from "react";
import { ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import customStyles from "../../../styles/customStyles";
import OptionCountrySelect from "../OptionCountrySelect";
import PrefixInput from "../PrefixInput";

const { mainColor, ligthBlue, blueSelected } = customStyles;

interface Props {
  options: Array<CountryItem>;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const OptionModal = ({
  options,
  isModalVisible,
  setIsModalVisible,
  selectedOption,
  setSelectedOption,
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
        scrollOffset={100}
        isVisible={isModalVisible}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => setIsModalVisible(false)}
        onSwipeComplete={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            borderRadius: 15,
            height: "50%",
          }}
        >
          <ScrollView>
            <View style={{ marginVertical: 10 }}>
              {options?.map((option, index) => (
                <OptionCountrySelect
                  key={index}
                  name={option.name}
                  flag={option.flag}
                  prefix={option.prefix}
                  backgroundColor={
                    selectedOption === option.id ? ligthBlue : "white"
                  }
                  textColor={
                    selectedOption === option.id ? mainColor : blueSelected
                  }
                  onPress={() => handleModal(option.id)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <PrefixInput
        value={selectedOption ? selectedOption : "1"}
        setValue={setSelectedOption}
        marginBottom={25}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  );
};

export default OptionModal;
