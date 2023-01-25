import React from "react";
import Modal from "react-native-modal";
import { View, ScrollView } from "react-native";
import CommonInput from "../CommonInput";
import InputForm from "../../../components/common/InputForm";
import Button from "../Button";
import customStyles from "../../../styles/customStyles";
import { createContactBodyInputDto } from "../../../../Maui-Backend/src/controllers/types";
import { useMutation } from "react-query";
import ScrollContainer from "../../../components/containers/ScrollContainer";
import InputDate from "../../../components/common/InputDate";
import OptionModal from "../../../components/common/OptionModal";
import { useNavigation } from "@react-navigation/native";

import { createNewContact } from "../../../services/contacts";
import { NavigationProp } from "@react-navigation/native";

const { mainColor, income } = customStyles;

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  value: string,
  setValue: (str: any) => void,
  date: string,
  setDate: (str: any) => void;
  comments?: string;
  setComments?: (value: string) => void;
  screen?: string;
  type?: createContactBodyInputDto["typeOfContact"];
  navigation: NavigationProp<any, any>;
}

const RepayModal = ({
  isModalVisible,
  setIsModalVisible,
  value,
  setValue,
  comments,
  setComments,
  date,
  setDate,
  type,
  screen,
}: Props) => {

  const navigation: any = useNavigation();

  const handleOnPress = (data: IContact) => {
    if (screen === "NewIncome") {
      navigation.navigate("NewIncome", { contact: data });
    }
    if (screen === "NewExpense") {
      navigation.navigate("NewExpense", { contact: data });
    } else {
      type.toUpperCase() === "CLIENT"
        ? navigation.navigate("Clients", { contact: data })
        : navigation.navigate("Providers", { contact: data });
    }
  };



  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      // onBackdropPress={() => setIsModalVisible(false)}
      // onSwipeComplete={() => setIsModalVisible(false)}
      // onBackButtonPress={() => setIsModalVisible(false)}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 15,
        }}
      >
          <InputForm
            keyboardType="numeric"
            placeholder="0,00"
            value={"30"}
            name="Valor"
            setValue={(val) => "35"
              // !!val && val !== "NaN" ? setAmount(val) : setAmount("")
            }
            marginBottom={20}
            marginTop={15}
            required
          />
          <CommonInput
            placeholder="¿Como quieres llamar a este ingreso?"
            name="Descripción"
            marginBottom={20}
            // value={"text"}
            setValue={() => {}}
          />
          <OptionModal
            title="Método de Pago"
            // options={paymentMethods.map((item) => item.name)}
            // isModalVisible={modalPayment}
            // setIsModalVisible={setModalPayment}
            // selectedOption={paymentMethod}
            // setSelectedOption={setPaymentMethod}
          />
          <InputDate
            name="Fecha"
            date={"25-01-2023"}
            setDate={() => {}}
            color={income}
            // style={{ display: "flex", width: "100%", margin: 10 }}
          />

          <Button 
            text="Crear Abono"
            style={{ 
              backgroundColor: mainColor,
              marginTop: 25
            }}
          />
      </View>
    </Modal>
  );
};

export default RepayModal;
