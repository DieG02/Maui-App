import React from "react";
import { View } from "react-native";
import InputForm from "./InputForm";
import CommonInput from "./CommonInput";
import InputDate from "./InputDate";
import "moment-timezone";
import Form from "../Library/Form";
import customStyles from "../../styles/customStyles";
import { NavigationProp } from "@react-navigation/native";
import useForm from "../../hooks/useForm";
import { queryClient } from "../../utils/queryClient";
import Button from "./Button";
import LoadingComponent from "../Library/LoadingComponent";
import { parseDDMMYY } from "../../utils/helper";
import { showToast } from "../../utils/toast";

interface Props {
    navigation: NavigationProp<any, any>;
    data: any;
}

const { mainColor, marginHorizontal } = customStyles;

const EditDebtForm = ({ navigation, data }: Props) => {

    const { params } = data;

    const initialValues: any =
    params?.type === 'debt' ? {
        value: String( params?.item?.value || params?.item?.amount)
            .replace(".", ","),
        name: params?.item?.name || `Abono del ${parseDDMMYY(params?.item?.paidAt)}`,
        date: params?.item?.paidAt
    } : {
        value: String(params?.item?.amount).replace(".", ","),
        name: `Abono del ${parseDDMMYY(params?.item?.paidAt)}`,
        date: params?.item?.paidAt,
        paymentMethod: params?.item?.paymentMethod
    }

    const { values, setValues } = useForm<InitialIncome>(initialValues);

    // Aquì va el mutateAsync
    // const { mutateAsync, isLoading } = useEditIncome(
    //     data.id,
    //     {
    //     date: values.date,
    //     name: values.name,
    //     value: parseFloat(values.value.replace(/\./g, "").replace(",", ".")),
    //     },
    //     {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries("Transactions");
    //         queryClient.removeQueries("IncomeDetail");
    //         navigation.navigate("balance");
    //         showToast();
    //     },
    //     }
    // );

    const handleSubmit = () => {
        // mutateAsync();
        console.log(values, 'Cambios guardados');
        navigation.navigate("Debts");
        showToast('Deuda editada satisfactoriamente');
    };

    // if (isLoading) {
    //     return <LoadingComponent color={mainColor} />;
    // }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
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
                placeholder="¿Como quieres llamar a esta deuda?"
                name="Descripción"
                marginBottom={20}
                value={values.name}
                setValue={(text) => setValues((prev) => ({ ...prev, name: text }))}
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
                disabled={false}
                onPress={handleSubmit}
                text="Guardar cambios"
                style={{
                    backgroundColor: false ? mainColor : "#B3B3B3",
                    borderRadius: 25,
                }}
                />
            </View>
        </View>
    );
};

export default EditDebtForm;
