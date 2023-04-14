import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import InputForm from "../../components/common/InputForm";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import InputDate from "../../components/common/InputDate";
import moment from "moment";
import "moment-timezone";
import Spacer from "../../components/common/Spacer";
import Button from "../../components/common/Button";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import SelectionModal from "../../components/common/Modals/SelectionModal";
import useForm from "../../hooks/useForm";
import usePayment from "../../hooks/usePayment";
import LoadingComponent from "../../components/Library/LoadingComponent";
import useGetExpenseCategories from "../../services/Expenses/useGetExpenseCategories";
import Form from "../../components/Library/Form";
import useGetAllContacts from "../../services/Contacts/useGetAllContacts";
import useEditExpense from "../../services/Expense/useEditExpense";
import OptionWithIcon from "../../components/common/OptionWithIcon";

const { width } = Dimensions.get("window");

const { mainColor, marginHorizontal } = customStyles;
interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}

const validateOptions: ValidateOptions = {
  isPaid: ["value", "categoryId"],
  isPending: ["value", "providerId", "categoryId"],
};

const EditExpense = ({ navigation, route }: Props) => {
  const {params} = route;
  const [modalPayment, setModalPayment] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalExpenseCategory, setModalExpenseCategory] = useState(false);
  const { data } = useGetExpenseCategories();
  const {data:providers} = useGetAllContacts();
  const {
    handlePayment,
    handlePaymentName,
    handleSelected,
    handleState,
    stateOptions,
    paymentsOptions,
  } = usePayment();

  const handleIdCategory = (expense: string, data: any[]) => {
    const category = data.find(
      (category: { name: string }) => category.name === expense
    );
    return category ? category.id : null;
  };

  const handleNameCategory = (expenseId: string, data: any[]) => {
    const category = data.find(
      (category: { id: string }) => category.id === expenseId
    );
    return category ? category.name : null;
  };

  const handleProvider = ( providerId: string, data: any[]) =>{
    const provider = data.find(
      (contact: { id: string }) => contact.id === providerId
    );
    return provider ? provider.name : null;
  }

  const initialValues: InitialExpense = {
    value: String(params?.expense.value),
    name: params?.expense.name,
    providerId: handleProvider(params?.expense.providerId, providers),
    categoryId: handleNameCategory(params?.expense.categoryId, data),
    isPaid: params?.expense.isPaid,
    paymentMethod: handlePaymentName(params?.expense.paymentMethod),
    date: params?.expense.date,
  };

  const { values, setValues, validateValues } =
    useForm<InitialExpense>(initialValues);

  const toValidate = useMemo(
    () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
    [values.isPaid]
  );

  useEffect(() => {
    if (route.params?.contact) {
      setValues((prev) => ({
        ...prev,
        providerId: route.params?.contact.name,
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

  const { mutateAsync, isLoading } = useEditExpense(params?.expense.id, {
    paymentMethod: handlePayment(values.paymentMethod),
    providerId: route.params?.contact ? route.params?.contact?.id : params?.expense.providerId,
    categoryId: data && handleIdCategory(values.categoryId, data),
    date: values.date,
    isPaid: values.isPaid,
  },
    {
      onSuccess: () => {
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
      <StatusBar backgroundColor="#E8F1FD" />
      <BackHeaderTitle
        label="Editar Egreso"
        onPressBack={() => navigation.goBack()}
        headerStyle={{ backgroundColor: "#E8F1FD" }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Form>
          <Spacer height={10} />
          <OptionWithIcon
            required
            title="Categoría"
            placeholder="Seleccione una categoría"
            options={data ? data : []}
            isModalVisible={modalExpenseCategory}
            setIsModalVisible={setModalExpenseCategory}
            selectedOption={values.categoryId}
            setSelectedOption={(text) => {
              setValues((prev) => ({ ...prev, categoryId: text }));
            }}
          />
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
            required
          />
          <CommonInput
            placeholder="¿Como quieres llamar a este egreso?"
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
            placeholder="Seleccione un proveedor"
            name="Proveedor"
            required={values.isPaid === false}
            value={values.providerId}
            marginBottom={20}
            onPress={() => {
              navigation.navigate("Providers", { screen: "EditExpense" });
            }}
            onPressClose={() => {
              setValues((prev) => ({ ...prev, providerId: "" }));
              navigation.setParams({ contact: "" });
            }}
          />
          <InputDate
            name="Fecha"
            date={values.date}
            setDate={(date) => setValues((prev) => ({ ...prev, date: date }))}
            color={mainColor}
          />
          <Spacer height={10} />
        </Form>
      </KeyboardAvoidingView>
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
export default EditExpense;
