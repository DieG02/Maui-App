import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
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
  isDataEmpty?: boolean;
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
  isDataEmpty,
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
              name="Nueva Categoría"
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

      {isDataEmpty ? (
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f9f9f9",
            height: 50,
            width: 210,
            borderRadius: 25,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
          >
            <Plus name="plus" size={25} color="#5196FE" />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: "#5196FE",
              fontFamily: "Gilroy-SemiBold",
            }}
          >
            Crear Categoría
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{
            backgroundColor: "#f9f9f9",
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
        >
          <Plus name="plus" size={25} color="#5196FE" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OptionModal;
