import React, { useState, useEffect, useMemo } from "react";
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
import { NavigationProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import { FAB } from "react-native-paper";
import InputDate from "../../components/common/InputDate";
import moment from "moment";
import "moment-timezone";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewExpense } from "../../services/expenses";
import { getExpenseCategories } from "../../services/expenseCategories";
import { createExpenseBodyInputDto } from "../../../Maui-Backend/src/controllers/types";
import Spacer from "../../components/common/Spacer";

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

const NewExpense = ({ navigation }: Props) => {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [client, setClient] = useState("");
  const [isPaid, setIsPaid] = useState(STATE[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].name);
  const [date, setDate] = useState(TODAY);
  const [expenseCategory, setExpenseCategory] = useState(
    "Seleccione una categoría"
  );

  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);

  const queryClient = useQueryClient();

  const isPaidState = useMemo(() => {
    if (isPaid === "Pagado") {
      return true;
    } else {
      return false;
    }
  }, [isPaid]);

  const paymentMethodHandler =
    (): createExpenseBodyInputDto["paymentMethod"] => {
      const payment = paymentMethods.find(
        (method) => method.name === paymentMethod
      );
      return payment
        ? (payment.value as createExpenseBodyInputDto["paymentMethod"])
        : "CASH";
    };

  const { data } = useQuery("expenseCategories", getExpenseCategories);

  const handleIdCategory = (expense: string, data: any[]) => {
    const category = data.find(
      (category: { name: string }) => category.name === expense
    );
    return category ? category.id : null;
  };

  const form: createExpenseBodyInputDto = {
    value: +amount,
    name: detail !== "" ? detail : expenseCategory,
    categoryId: data && handleIdCategory(expenseCategory, data),
    isPaid: isPaidState,
    paymentMethod: paymentMethodHandler(),
    date: date,
  };
  const handleSubmit = (form: createExpenseBodyInputDto) => {
    mutateAsync(form);
  };
  const { mutateAsync } = useMutation(
    (form: createExpenseBodyInputDto) => {
      return createNewExpense(form);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
        queryClient.invalidateQueries("balance");
        queryClient.invalidateQueries("getMonthlyStats");
      },
    }
  );

  useEffect(() => {
    if (isPaid === "Pagado") {
      setPaymentMethod(paymentMethods[0].name);
    } else if (isPaid === "Deuda") {
      setPaymentMethod("");
    }
  }, [isPaid]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#FD6363" />
      <View
        style={{
          height: Platform.select({ ios: 52, android: 0 }),
          backgroundColor: Platform.select({ ios: "#FD6363" }),
        }}
      />
      <View
        style={{
          backgroundColor: "#FD6363",
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <Header
          titleColor="white"
          name="Registrar Gasto"
          color="#FD6363"
          icon={
            <Icon onPress={() => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color="white" />
            </Icon>
          }
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}
      >
        <View>
          <Spacer height={15} />
          <OptionModal
            title="Categoría"
            options={data?.map((category) => category?.name) ?? []}
            isModalVisible={modalExpenseCategory}
            setIsModalVisible={setModalExpenseCategory}
            selectedOption={expenseCategory}
            setSelectedOption={setExpenseCategory}
          />

          <InputForm
            keyboardType="numeric"
            placeholder="0,00"
            value={amount}
            name="Valor"
            setValue={setAmount}
            marginBottom={25}
          />
          <CommonInput
            placeholder="¿Como quieres llamar a este egreso?"
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
          />
          <InputDate
            name="Fecha"
            date={date}
            setDate={setDate}
            color="#FD6363"
          />
          <Spacer height={10} />
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
export default NewExpense;
