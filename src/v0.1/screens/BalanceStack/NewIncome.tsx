import React, { useState, useEffect, useMemo } from "react";
import { View, ToastAndroid } from "react-native";
import InputForm from "../../components/common/InputForm";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import InputDate from "../../components/common/InputDate";
import moment from "moment";
import "moment-timezone";
import Button from "../../components/common/Button";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import SelectionModal from "../../components/common/Modals/SelectionModal";
import LoadingComponent from "../../components/Library/LoadingComponent";
import { paymentMethods, STATE } from "../../utils/payment";
import useCreateIncome from "../../services/Incomes/useCreateIncome";
import useForm from "../../hooks/useForm";
import usePayment from "../../hooks/usePayment";
import Form from "../../components/Library/Form";
import { queryClient } from "../../utils/queryClient";
import Spacer from "../../components/common/Spacer";

// TODO:Refactor this component

const { marginHorizontal, mainColor, width, background2 } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const TODAY = moment.parseZone().toISOString();

const initialValues: InitialIncome = {
  value: "",
  name: "",
  clientId: "",
  clientName: "",
  isPaid: STATE["PAGADO"].value,
  paymentMethod: paymentMethods["CASH"].es,
  date: TODAY,
};

interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const validateOptions: ValidateOptions = {
  isPaid: ["value"],
  isPending: ["value", "clientId"],
};

const NewIncome = ({ navigation, route }: Props) => {
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);

  const { values, setValues, validateValues } =
    useForm<InitialIncome>(initialValues);

  const {
    handlePayment,
    handleSelected,
    handleState,
    stateOptions,
    paymentsOptions,
  } = usePayment();

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (route.params?.contact) {
      setValues((prev) => ({
        ...prev,
        clientName: route.params?.contact.name,
        clientId: route.params?.contact.id,
      }));
    }
  }, [route.params?.contact]);

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "La transacción fue creada satisfactoriamente",
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  };

  const { mutateAsync, isLoading } = useCreateIncome(
    {
      ...values,
      date: values.date,
      name:
        values.name !== "" ? values.name : `Venta ${moment.parseZone().unix()}`,
      value: parseFloat(values.value.replace(/\./g, "").replace(",", ".")),
      paymentMethod: handlePayment(values.paymentMethod),
      clientId: route.params?.contact?.id,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("incomes");
        navigation.goBack();
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
      <BackHeaderTitle
        label="Nuevo Ingreso"
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
          setValue={(text) => setValues((prev) => ({ ...prev, name: text }))}
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
                  setValues((prev) => ({
                    ...prev,
                    isPaid: handleState(text),
                  }))
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
          required={values.isPaid === false}
          value={values.clientName}
          marginBottom={20}
          onPress={() => {
            navigation.navigate("Clients", { screen: "NewIncome" });
          }}
          onPressClose={() => {
            setValues((prev) => ({
              ...prev,
              clientId: "",
              clientName: "",
            }));
            navigation.setParams({ contact: "" });
          }}
        />
        <InputDate
          name="Fecha"
          date={values.date}
          setDate={(date) => setValues((prev) => ({ ...prev, date: date }))}
          color={mainColor}
        />
        <Spacer height={20} />
      </Form>
      <View
        style={{
          justifyContent: "center",
          marginHorizontal: marginHorizontal,
          marginBottom: 40,
        }}
      >
        <Button
          disabled={!validateValues(toValidate)}
          onPress={handleSubmit}
          text="Registrar ingreso"
          color={validateValues(toValidate) ? "white" : mainColor}
          style={{
            backgroundColor: validateValues(toValidate)
              ? mainColor
              : background2,
            borderRadius: 25,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default NewIncome;
