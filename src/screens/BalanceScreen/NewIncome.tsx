import React, { useState, useEffect } from "react";
import { View, Dimensions, StatusBar } from "react-native";
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
import ScrollContainer from "../../components/containers/ScrollContainer";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import globalStyles from "../../styles/globalStyles";
import SelectionModal from "../../components/common/Modals/SelectionModal";

const { width } = Dimensions.get("window");

const { income, marginHorizontal } = globalStyles;

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

  const [isValidForm, setIsValidForm] = useState(false);
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

  useEffect(() => {
    const isValidAmount = !!amount && amount !== "0";
    const isValidTransaction =
      isPaid === "Pagado" || (isPaid === "Deuda" && !!client);
    setIsValidForm(isValidAmount && isValidTransaction && !!date);
    console.log(isValidAmount && isValidTransaction && !!date);
  }, [amount, isPaid, client, date]);

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={income} />
      <BackHeaderTitle
        label="Nuevo Ingreso"
        onPressBack={() => navigation.goBack()}
        hasType
        color={income}
      />
      <ScrollContainer>
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
          keyboardType="numeric"
          placeholder="0,00"
          value={amount}
          name="Valor"
          setValue={(val) =>
            !!val && val !== "NaN" ? setAmount(val) : setAmount("")
          }
          marginBottom={25}
          required
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
        <SelectionModal
          placeholder="Seleccione un cliente"
          name="Cliente"
          required={isPaid === "Deuda"}
          value={client}
          setValue={setClient}
          marginBottom={25}
          onPress={() => {
            navigation.navigate("Clients", { screen: "NewIncome" });
          }}
          onPressClose={() => {
            setClient("");
            navigation.setParams({ contact: undefined });
          }}
        />
        <InputDate name="Fecha" date={date} setDate={setDate} color={income} />
        <Spacer height={10} />
      </ScrollContainer>
      <View
        style={{
          height: 80,
          justifyContent: "center",
          marginHorizontal: marginHorizontal,
        }}
      >
        <Button
          disabled={!isValidForm}
          onPress={handleSubmit}
          text="Registrar venta"
          style={{
            backgroundColor: isValidForm ? income : "#B3B3B3",
            borderRadius: 25,
            elevation: isValidForm ? 3 : 0,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default NewIncome;
