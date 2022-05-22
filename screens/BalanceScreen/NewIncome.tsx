import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Fab from "../../components/common/Fab";
import ButtonInput from "../../components/common/ButtonInput";
import Calendar from "react-native-vector-icons/Entypo";
import Check from "react-native-vector-icons/FontAwesome";
import InputForm from "../../components/common/InputForm";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import { FAB } from "react-native-paper";
import InputDate from "../../components/common/InputDate";
import moment from "moment";
import "moment-timezone";

const { width, height } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

const paymentMethods = ["CASH", "CARD", "BANK_TRANSFER", "OTHER"];
const state = ["Pagado", "Deuda"];
const payment = ["Efectivo", "Tarjeta", "Transferencia", "Otro"];

const NewIncome = ({ navigation }: Props) => {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [products, setProducts] = useState([]);
  const [client, setClient] = useState("");
  const [isPaid, setIsPaid] = useState(state[0]);
  const [paymentMethod, setPaymentMethod] = useState(payment[0]);

  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const TODAY = moment.parseZone().format("DD-MM-YYYY");
  const YESTERDAY = moment.parseZone().subtract(1, "days").format("DD-MM-YYYY");

  const [date, setDate] = useState(TODAY);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [time, setTime] = useState("");

  const form = {
    amount: amount,
    detail: detail,
    products: products,
    client: client,
    isPaid: isPaid,
    paymentMethod: paymentMethod,
    date: date,
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     setTime(moment.parseZone().format());
  //   }, 1000 * 60);
  // }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const OTHER_DAY = moment(date).parseZone().format("DD-MM-YYYY");
    setDate(OTHER_DAY);
    hideDatePicker();
  };

  useEffect(() => {
    if (isPaid === "Pagado") {
      setPaymentMethod(payment[0]);
    } else if (isPaid === "Deuda") {
      setPaymentMethod("");
    }
  }, [isPaid]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#33E69B" />
      <View
        style={{
          height: Platform.select({ ios: 52, android: 0 }),
          backgroundColor: Platform.select({ ios: "#33E69B" }),
        }}
      />
      <View
        style={{
          backgroundColor: "#33E69B",
          height: 120,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <Header
          titleColor="white"
          name="Nueva Venta"
          color="#33E69B"
          icon={
            <Icon onPress={() => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color="white" />
            </Icon>
          }
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              height: 40,
            }}
          >
            $
          </Text>
          <InputForm
            keyboardType="numeric"
            placeholder="0,00"
            value={amount}
            setValue={setAmount}
            focus={true}
            horizontal={5}
            style={{
              backgroundColor: "#33E69B",
              marginTop: 0,
              height: 55,
              justifyContent: "center",
            }}
            textStyle={{
              color: "white",
              fontSize: 30,
              minWidth: 70,
              fontWeight: "bold",
              justifyContent: "center",
            }}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}
      >
        <View
          style={{
            height: height - 150,
          }}
        >
          <View>
            <CommonInput
              placeholder="¿Como quieres llamar a este ingreso?"
              name="Detalle"
              marginTop={30}
              marginBottom={25}
              value={detail}
              setValue={setDetail}
            />
            <CommonInput
              placeholder="Seleccione productos"
              name="Productos"
              touchable={true}
              value={products}
              setValue={setProducts}
              marginBottom={25}
            />
            {isPaid === "Pagado" ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    width: (width - 100) / 2,
                  }}
                >
                  <OptionModal
                    title="Estado"
                    options={state}
                    isModalVisible={modalState}
                    setIsModalVisible={setModalState}
                    selectedOption={isPaid}
                    setSelectedOption={setIsPaid}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    width: (width - 100) / 2,
                  }}
                >
                  <OptionModal
                    title="Metodo de Pago"
                    options={payment}
                    isModalVisible={modalPayment}
                    setIsModalVisible={setModalPayment}
                    selectedOption={paymentMethod}
                    setSelectedOption={setPaymentMethod}
                  />
                </View>
              </View>
            ) : (
              <OptionModal
                title="Estado"
                options={state}
                isModalVisible={modalState}
                setIsModalVisible={setModalState}
                selectedOption={isPaid}
                setSelectedOption={setIsPaid}
              />
            )}
            <CommonInput
              placeholder="Seleccione un cliente"
              name="Cliente"
              touchable={true}
              value={client}
              setValue={setClient}
              marginBottom={25}
            />

            <InputDate name="Fecha" />
            <View
              style={{
                height: 80,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FAB
                color="white"
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  elevation: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "#33E69B",
                  backgroundColor: "#B3B3B3",
                }}
                small={false}
                icon="check"
                onPress={() => console.log("Guardar", form)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default NewIncome;
