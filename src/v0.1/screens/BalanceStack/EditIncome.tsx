import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import InputForm from "../../components/common/InputForm";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import InputDate from "../../components/common/InputDate";
import "moment-timezone";
import { useQueryClient } from "react-query";
import { PaymentMethod } from "../../../../../Maui-Backend/node_modules/@prisma/client";
import Button from "../../components/common/Button";
import ScrollContainer from "../../components/containers/ScrollContainer";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import SelectionModal from "../../components/common/Modals/SelectionModal";
import { editIncomeBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import useEditIncome from "../../services/Incomes/useEditIncome";
import useGetContactById from "../../services/Contact/useGetContactById";
import moment from "moment-timezone";

const { marginHorizontal, mainColor, width } = customStyles;

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

const EditIncome = ({ navigation, route }: Props) => {
  const {params} = route;
  const [operation, setOpetarion] = useState(params?.item);

  const getPaymentMethod = (arr: Array<any>, value:string, key:string, result: string): PaymentMethod => {
    return arr.find((item) => item[key] === value)?.[result];
  };

  const { data:contact } = useGetContactById(operation.clientId);

  const [client, setClient] = useState({
    name: contact?.name,
    id: contact?.id,
  });
  const [isPaid, setIsPaid] = useState(operation.isPaid?"Pagado":"Deuda");
  const [paymentMethod, setPaymentMethod] = useState(getPaymentMethod(paymentMethods, operation.paymentMethod, 'value', 'name'));
  const [isValidForm, setIsValidForm] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const queryClient = useQueryClient();

  const data: editIncomeBodyInputDto = {
    value: operation.value,
    name: operation.name !== "" ? operation.name : `Venta ${moment.parseZone().unix()}`,
    isPaid: isPaid === "Pagado",
    date: operation.date,
    paymentMethod: getPaymentMethod(paymentMethods, paymentMethod, 'name', 'value'),
    clientId: client.id,
  }

  const {mutateAsync: editIncome} = useEditIncome(params?.item.id, data, 
    {
      onSuccess(){
        navigation.goBack();
        queryClient.invalidateQueries("Transactions");
        queryClient.invalidateQueries("Balance");
        queryClient.invalidateQueries("Monthly_Stats");
      }
    });
  useEffect(() => {
    if (params?.contact) {
      setClient({
        name: params?.contact.name,
        id:params?.contact.id
      });
    }
  }, [params?.contact]);

  useEffect(() => {
    const isValidAmount = operation.value && operation.value !== 0;
    const isValidTransaction =
      isPaid === "Pagado" || (isPaid === "Deuda" && !!client);
    setIsValidForm(isValidAmount && isValidTransaction && !!operation.date);
  }, [operation.value, isPaid, client, operation.date]);

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={mainColor} />
      <BackHeaderTitle
        label="Editar Ingreso"
        onPressBack={() => navigation.goBack()}
        hasType
        color={mainColor}
      />
      <ScrollContainer>
        <InputForm
          keyboardType="numeric"
          placeholder="0,00"
          value={String(operation.value)}
          name="Valor"
          setValue={(item)=>setOpetarion({...operation, value:item})}
          marginBottom={20}
          marginTop={15}
          required
        />
        <CommonInput
          placeholder="¿Como quieres llamar a este ingreso?"
          name="Descripción"
          marginBottom={20}
          value={operation.name}
          setValue={(item)=>setOpetarion({...operation, name:item})}
        />
        {isPaid==='Pagado'? (
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
          value={client.name}
          setValue={(item)=>setClient({...client, name:item})}
          marginBottom={20}
          onPress={() => {
            navigation.navigate("Clients", { screen: "EditIncome" });
          }}
          onPressClose={() => {
            setClient({...client,name:"", id:""});
            navigation.setParams({ contact: undefined });
          }}
        />
        <InputDate
          name="Fecha"
          date={operation.date}
          setDate={(value)=>setOpetarion({...operation, date: value})}
          color={mainColor}
        />
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
          onPress={()=>editIncome()}
          text="Registrar venta"
          style={{
            backgroundColor: isValidForm ? mainColor : "#B3B3B3",
            borderRadius: 25,
            elevation: isValidForm ? 3 : 0,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default EditIncome;
