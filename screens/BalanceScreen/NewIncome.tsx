import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import InputForm from "../../components/common/InputForm";
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import { FAB } from "react-native-paper";
import InputDate from "../../components/common/InputDate";
import moment from "moment";
import "moment-timezone";
import { useMutation, useQueryClient } from "react-query";
import { addIncome } from "../../services/transactions";

const { width } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

const paymentMethods = [
  { name: "Efectivo", value: "CASH" },
  { name: "Tarjeta", value: "CARD" },
  { name: "Transferencia", value: "BANK_TRANSFER" },
  { name: "Otro", value: "OTHER" },
];

const STATE = ["Pagado", "Deuda"];
const TODAY = moment.parseZone().format("DD-MM-YYYY");

const NewIncome = ({ navigation }: Props) => {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [products, setProducts] = useState([]);
  const [client, setClient] = useState("");
  const [isPaid, setIsPaid] = useState(STATE[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].name);
  const [date, setDate] = useState(TODAY);

  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const queryClient = useQueryClient();

  const isPaidHandler = () => {
    if (isPaid === "Pagado") {
      return true;
    } else {
      return false;
    }
  };

  const paymentMethodHandler = () => {
    const payment = paymentMethods.find(
      (method) => method.name === paymentMethod
    );
    return payment ? payment.value : null;
  };

  const form = {
    value: +amount,
    name: detail,
    products: products,
    client: client,
    isPaid: isPaidHandler(),
    paymentMethod: paymentMethodHandler(),
    date: date,
  };

  const { mutateAsync } = useMutation(
    (form: object) => {
      return addIncome(form);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
        queryClient.invalidateQueries("balance");
      },
    }
  );

  const handleSubmit = (form: object) => {
    console.log(form);
    mutateAsync(form);
  };

  useEffect(() => {
    if (isPaid === "Pagado") {
      setPaymentMethod(paymentMethods[0].name);
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
        <View style={{ marginBottom: 10 }}>
          <CommonInput
            placeholder="¿Como quieres llamar a este ingreso?"
            name="Detalle"
            marginTop={25}
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
                  options={STATE}
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
                  title="Método de Pago"
                  options={paymentMethods.map((item) => item.name)}
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
              options={STATE}
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
          <InputDate
            name="Fecha"
            date={date}
            setDate={setDate}
            color="#33E69B"
          />
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 90,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
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
            backgroundColor: "#B3B3B3",
          }}
          small={false}
          icon="check"
          onPress={() => handleSubmit(form)}
        />
      </View>
    </View>
  );
};
export default NewIncome;
