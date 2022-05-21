import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import globalStyles from "../../styles/globalStyles";
import OptionSelect from "./OptionSelect";
import CommonInput from "./CommonInput";

const { mainColor } = globalStyles;

interface Props {
  options: Array<string>;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  title: string;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const OptionModal = ({
  options,
  isModalVisible,
  setIsModalVisible,
  title,
  selectedOption,
  setSelectedOption,
}: Props) => {
  
  console.log("selectedOption ==>", selectedOption);

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
            backgroundColor: "white",
            marginHorizontal: 10,
            borderRadius: 15,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            {options?.map((option, index) => (
              <OptionSelect
                key={index}
                name={option}
                backgroundColor={
                  selectedOption === option ? "#E6EFF8" : "white"
                }
                textColor={selectedOption === option ? mainColor : "#737373"}
                onPress={() => handleModal(option)}
              />
            ))}
          </View>
        </View>
      </Modal>
      <CommonInput
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

const styles = StyleSheet.create({});

export default OptionModal;
