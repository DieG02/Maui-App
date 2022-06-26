import React from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CommonInput from "./CommonInput";
import Plus from "react-native-vector-icons/FontAwesome5";
import Button from "./Button";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  onPress: () => void;
  buttonText: string;
  buttonStyle: object;
  buttonDisabled?: boolean;
}

const OptionModal = ({
  isModalVisible,
  setIsModalVisible,
  selectedOption,
  setSelectedOption,
  onPress,
  buttonDisabled,
  buttonText,
  buttonStyle,
}: Props) => {
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
          <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
            <CommonInput
              placeholder="Nombre de la Categoría"
              marginBottom={40}
              value={selectedOption}
              setValue={setSelectedOption}
            />

            {buttonDisabled ? (
              <Button
                text={buttonText}
                style={{ backgroundColor: "gray", height: 55 }}
                onPress={onPress}
                disabled
              />
            ) : (
              <Button text={buttonText} style={buttonStyle} onPress={onPress} />
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Plus name="plus" size={30} color="#5196FE" />
      </TouchableOpacity>
    </View>
  );
};

export default OptionModal;
