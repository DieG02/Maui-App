import React, { useState, useEffect } from "react";
import {
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
import { NavigationProp, RouteProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import InputDate from "../../components/common/InputDate";
import moment from "moment";
import "moment-timezone";
import { useMutation, useQueryClient } from "react-query";
import { createNewIncome } from "../../services/incomes";
import Spacer from "../../components/common/Spacer";
import { PaymentMethod } from "../../../../Maui-Backend/node_modules/@prisma/client";
import Button from "../../components/common/Button";

const { width } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const paymentMethods: { name: string; value: PaymentMethod }[] = [
  { name: "Efectivo", value: "CASH" },
  { name: "Tarjeta", value: "CARD" },
  { name: "Transferencia", value: "BANK_TRANSFER" },
  { name: "Otro", value: "OTHER" },
];

const STATE = ["Pagado", "Deuda"];
const TODAY = moment.parseZone().format("DD-MM-YYYY");

const NewIncome = ({ navigation, route }: Props) => {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [products, setProducts] = useState("");
  const [client, setClient] = useState("");
  const [isPaid, setIsPaid] = useState(STATE[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].name);
  const [date, setDate] = useState(TODAY);

  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (route.params?.contact) {
      setClient(route.params.contact.name);
    }
  }, [route.params?.contact]);

  const paymentMethodHandler = (): PaymentMethod => {
    const payment = paymentMethods.find(
      (method) => method.name === paymentMethod
    );
    return payment ? payment.value : "CASH";
  };

  const { mutateAsync } = useMutation(createNewIncome, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactionsBalance");
      queryClient.invalidateQueries("balance");
      queryClient.invalidateQueries("getMonthlyStats");
    },
  });

  const handleSubmit = () =>
    mutateAsync({
      value: +amount,
      name: detail !== "" ? detail : `Venta ${moment.parseZone().unix()}`,
      isPaid: isPaid === "Pagado",
      paymentMethod: paymentMethodHandler(),
      date: date,
      clientId: route.params?.contact?.id,
    });

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
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Header
          titleColor="white"
          name="Registrar Ingreso"
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
        ></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}
      >
        <CommonInput
          placeholder="Seleccione productos"
          name="Productos"
          touchable={true}
          value={products}
          setValue={setProducts}
          marginBottom={25}
          marginTop={10}
          onPress={() => navigation.navigate("AddItems")}
        />
        <InputForm
          autoFocus={true}
          keyboardType="numeric"
          placeholder="0,00"
          value={amount}
          name="Valor"
          setValue={setAmount}
          marginBottom={25}
          onSubmit={() => {
            if (amount === "") {
              setAmount("0,00");
            }
          }}
        />
        <CommonInput
          placeholder="¿Como quieres llamar a este ingreso?"
          name="Descripción"
          marginBottom={25}
          value={detail}
          setValue={setDetail}
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
          onPress={() =>
            navigation.navigate("Clients", { screen: "NewIncome" })
          }
        />
        <InputDate name="Fecha" date={date} setDate={setDate} color="#33E69B" />
        <Spacer height={10} />
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Button
          disabled={amount === "" || amount === "0"}
          onPress={handleSubmit}
          text="Registrar venta"
          style={{
            backgroundColor:
              amount === "" || amount === "0" ? "#B3B3B3" : "#33E69B",
            width: width - 80,
            borderRadius: 25,
            elevation: amount !== "" ? 3 : 0,
          }}
        />
      </View>
    </View>
  );
};
export default NewIncome;
