import React, { useState, useEffect, useMemo } from "react";
import { View, StatusBar, ToastAndroid } from "react-native";
import InputForm from "../../components/common/InputForm";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import InputDate from "../../components/common/InputDate";
import "moment-timezone";
import Button from "../../components/common/Button";
// import ScrollContainer from "../../components/containers/ScrollContainer";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import SelectionModal from "../../components/common/Modals/SelectionModal";
import LoadingComponent from "../../components/Library/LoadingComponent";
import useForm from "../../hooks/useForm";
import usePayment from "../../hooks/usePayment";
import Form from "../../components/Library/Form";
import useGetAllContacts from "../../services/Contacts/useGetAllContacts";
import useEditIncome from "../../services/Incomes/useEditIncome";
import { queryClient } from "../../utils/queryClient";

// TODO:Refactor this component

const { marginHorizontal, mainColor, width } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const validateOptions: ValidateOptions = {
  isPaid: ["value", "clientId"],
  isPending: ["value", "clientId"],
};

const EditIncome = ({ navigation, route }: Props) => {
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const {params} = route;
  const {data:clients} = useGetAllContacts();

  const {
    handlePayment,
    handlePaymentName,
    handleSelected,
    handleState,
    stateOptions,
    paymentsOptions,
  } = usePayment();

  const handleClient = ( clientId: string, data: any[]) =>{
    const client = data.find(
      (contact: { id: string }) => contact.id === clientId
    );
    return client ? client.name : null;
  }

  const initialValues: InitialIncome = {
    value: String(params?.income.value),
    name: params?.income.name,
    clientId: handleClient(params?.income.clientId, clients),
    isPaid: params?.income.isPaid,
    paymentMethod:  handlePaymentName(params?.income.paymentMethod),
    date: params?.income.date,
  };

  const { values, setValues, validateValues } =
  useForm<InitialIncome>(initialValues);

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (route.params?.contact) {
      setValues((prev) => ({ ...prev, clientId: route.params?.contact.name }));
    }
  }, [route.params?.contact]);

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "La transacción fue editada satisfactoriamente",
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  };

  const { mutateAsync, isLoading } = useEditIncome(
    params?.income.id,
    {
      paymentMethod: handlePayment(values.paymentMethod),
      clientId: route.params?.contact ? route.params?.contact?.id : params?.income.clientId,
      date: values.date,
      isPaid: values.isPaid,
      name: values.name,
      value: parseFloat(values.value.replace(/\./g,'').replace(",", "."))
    },
    {
      onSuccess: () => {
        navigation.navigate('balance');
        queryClient.invalidateQueries('Transactions')
        showToast();
      },
    }
  );

  const handleSubmit = () => {
    if (validateValues(toValidate)) {
      mutateAsync();
    }
  };


  if (isLoading) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={mainColor} />
      <BackHeaderTitle
        label="Editar Ingreso"
        onPressBack={() => navigation.goBack()}
        hasType
        color={mainColor}
      />
      <Form>
        <InputForm
          keyboardType="numeric"
          placeholder="0,00"
          value={values.value}
          name="Valor"
          setValue={(val) => {
            const newValue = !!val && val !== "NaN" ? val : "";
            setValues((prev) => ({ ...prev, value: newValue }));
          }}
          marginBottom={20}
          marginTop={15}
          required
        />
        <CommonInput
          placeholder="¿Como quieres llamar a este ingreso?"
          name="Descripción"
          marginBottom={20}
          value={values.name}
          setValue={
            (text) => setValues((prev) => (
              { ...prev, name: text }
            ))
          }
        />
        {values.isPaid === true ? (
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
                options={stateOptions}
                isModalVisible={modalState}
                setIsModalVisible={setModalState}
                selectedOption={handleSelected(values.isPaid)}
                setSelectedOption={(text) =>
                  setValues((prev) => ({ ...prev, isPaid: handleState(text) }))
                }
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
                options={paymentsOptions}
                isModalVisible={modalPayment}
                setIsModalVisible={setModalPayment}
                selectedOption={values.paymentMethod}
                setSelectedOption={(text) =>
                  setValues((prev) => ({
                    ...prev,
                    paymentMethod: text,
                  }))
                }
              />
            </View>
          </View>
        ) : (
          <OptionModal
            title="Estado"
            options={stateOptions}
            isModalVisible={modalState}
            setIsModalVisible={setModalState}
            selectedOption={handleSelected(values.isPaid)}
            setSelectedOption={(text) =>
              setValues((prev) => ({ ...prev, isPaid: handleState(text) }))
            }
          />
        )}
        <SelectionModal
          placeholder="Seleccione un cliente"
          name="Cliente"
          required
          value={values.clientId}
          marginBottom={20}
          onPress={() => {
            navigation.navigate("Clients", { screen: "EditIncome" });
          }}
          onPressClose={() => {
            setValues((prev) => ({ ...prev, clientId: "" }));
            navigation.setParams({ contact: "" });
          }}
        />
        <InputDate
          name="Fecha"
          date={values.date}
          setDate={(date) => setValues((prev) => ({ ...prev, date: date }))}
          color={mainColor}
        />
      </Form>
      <View
        style={{
          height: 80,
          justifyContent: "center",
          marginHorizontal: marginHorizontal,
        }}
      >
        <Button
          disabled={!validateValues(toValidate)}
          onPress={handleSubmit}
          text="Guardar cambios"
          style={{
            backgroundColor: validateValues(toValidate) ? mainColor : "#B3B3B3",
            borderRadius: 25,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default EditIncome;