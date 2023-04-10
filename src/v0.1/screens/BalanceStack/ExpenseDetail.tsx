import { useState, useEffect, useMemo } from "react"
import { View, Dimensions } from "react-native"
import InputForm from "../../components/common/InputForm"
import { NavigationProp } from "@react-navigation/native"
import CommonInput from "../../components/common/CommonInput"
import OptionModal from "../../components/common/OptionModal"
import InputDate from "../../components/common/InputDate"
import "moment-timezone"
import Spacer from "../../components/common/Spacer"
import Button from "../../components/common/Button"
import customStyles from "../../styles/customStyles"
import SelectionModal from "../../components/common/Modals/SelectionModal"
import useForm from "../../hooks/useForm"
import usePayment from "../../hooks/usePayment"
import LoadingComponent from "../../components/Library/LoadingComponent"
import useGetExpenseCategories from "../../services/Expenses/useGetExpenseCategories"
import Form from "../../components/Library/Form"
import useGetAllContacts from "../../services/Contacts/useGetAllContacts"
import useEditExpense from "../../services/Expense/useEditExpense"
import { showToast } from "../../utils/toast"
import OptionWithIcon from "../../components/common/OptionWithIcon"
import moment from "moment-timezone"
import { queryClient } from "../../utils/queryClient"

const { width } = Dimensions.get("window")
const { mainColor, marginHorizontal } = customStyles
interface Props {
    navigation: NavigationProp<any, any>
    params: any
    data: ExpenseResponse
}

const validateOptions: ValidateOptions = {
    isPaid: ["value", "categoryId"],
    isPending: ["value", "providerId", "categoryId"],
}

const ExpenseDetail = ({ navigation, data, params }: Props) => {
    const [modalPayment, setModalPayment] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [modalExpenseCategory, setModalExpenseCategory] = useState(false)
    const { data: expenseCategory } = useGetExpenseCategories()
    const { data: providers } = useGetAllContacts()
    const { handlePayment,
        handlePaymentName,
        handleSelected,
        handleState,
        stateOptions,
        paymentsOptions } = usePayment()

    const handleObjValue = (findValue: string, byKey: string, returnKey: string, data: any[]) => {
        const object = data.find(element => element[byKey] === findValue)
        return object ? object[returnKey] : null
    }

    const initialValues: InitialExpense = {
        value: String(data.value).toLocaleString(),
        name: data.name,
        providerId: handleObjValue(data.providerId, 'id', 'name', providers),
        categoryId: handleObjValue(data.categoryId, 'id', 'name', expenseCategory),
        isPaid: data.isPaid,
        paymentMethod: handlePaymentName(data.paymentMethod),
        date: `${data?.date?.slice(5, 7)}-${data?.date?.slice(8, 10)}-${data.date.slice(0, 4)}`,
    }

    const { values, setValues, validateValues } = useForm<InitialExpense>(initialValues)

    const toValidate = useMemo(
        () => (values.isPaid ? validateOptions.isPaid : validateOptions.isPending),
        [values.isPaid]
    )

    useEffect(() => {
        if (params?.contact) {
            setValues((prev) => ({
                ...prev,
                providerId: params?.contact.name,
            }))
        }
    }, [params?.contact])

    const { mutateAsync, isLoading } = useEditExpense(data.id, {
        ...values,
        value: parseFloat((values.value).replace(".", "").replace(",", ".")),
        paymentMethod: handlePayment(values.paymentMethod),
        providerId: params?.contact ? params?.contact?.id : params?.expense.providerId,
        categoryId: expenseCategory && handleObjValue(values.categoryId, 'name', 'id', expenseCategory),
        date: new Date(values.date.slice(6) + '-' + values.date.slice(0, 5)).toISOString(),
        isPaid: values.isPaid,
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("expenseDetail")
                navigation.goBack()
                showToast("La transacción fue creada satisfactoriamente")
            },
        }
    )

    const handleSubmit = () => {
        if (validateValues(toValidate)) mutateAsync()
    }

    if (isLoading) return <LoadingComponent color={mainColor} />

    return (
        <>
            <Form>
                <Spacer height={10} />
                <OptionWithIcon title="Categoría"
                    required
                    placeholder="Seleccione una categoría"
                    options={expenseCategory ? expenseCategory : []}
                    isModalVisible={modalExpenseCategory}
                    setIsModalVisible={setModalExpenseCategory}
                    selectedOption={values.categoryId}
                    setSelectedOption={(text) => {
                        setValues((prev) => ({ ...prev, categoryId: text }))
                    }}
                />
                <InputForm name="Valor"
                    keyboardType="numeric"
                    placeholder="0,00"
                    value={values.value}
                    setValue={(val) => {
                        const newValue = !!val && val !== "NaN" ? val : ""
                        setValues((prev) => ({ ...prev, value: newValue }))
                    }}
                    marginBottom={20}
                    required
                />
                <CommonInput name="Descripción"
                    placeholder="¿Como quieres llamar a este egreso?"
                    marginBottom={20}
                    value={values.name}
                    setValue={(text) => setValues((prev) => ({ ...prev, name: text }))}
                />
                {values.isPaid === true ? (
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <View style={{
                            display: "flex",
                            width: (width - 100) / 2,
                        }}>
                            <OptionModal title="Estado"
                                options={stateOptions}
                                isModalVisible={modalState}
                                setIsModalVisible={setModalState}
                                selectedOption={handleSelected(values.isPaid)}
                                setSelectedOption={(text) =>
                                    setValues((prev) => ({
                                        ...prev,
                                        isPaid: handleState(text),
                                    }))
                                } />
                        </View>
                        <View style={{
                            display: "flex",
                            width: (width - 100) / 2,
                        }}>
                            <OptionModal title="Método de Pago"
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
                    <OptionModal title="Estado"
                        options={stateOptions}
                        isModalVisible={modalState}
                        setIsModalVisible={setModalState}
                        selectedOption={handleSelected(values.isPaid)}
                        setSelectedOption={(text) =>
                            setValues((prev) => ({ ...prev, isPaid: handleState(text) }))
                        }
                    />
                )}
                <SelectionModal name="Proveedor"
                    placeholder="Seleccione un proveedor"
                    required={values.isPaid === false}
                    value={values.providerId}
                    marginBottom={20}
                    onPress={() => {
                        navigation.navigate("Providers", { screen: "EditExpense" })
                    }}
                    onPressClose={() => {
                        setValues((prev) => ({ ...prev, providerId: "" }))
                        navigation.setParams({ contact: "" })
                    }}
                />
                <InputDate name="Fecha"
                    date={values.date}
                    setDate={(date) => setValues((prev) => ({ ...prev, date: date }))}
                    color={mainColor}
                />
                <Spacer height={10} />
            </Form>
            <View style={{
                height: 80,
                justifyContent: "center",
                marginHorizontal: marginHorizontal,
            }}>
                <Button style={{
                    backgroundColor: validateValues(toValidate) ? mainColor : "#B3B3B3",
                    borderRadius: 25,
                }}
                    disabled={!validateValues(toValidate)}
                    onPress={handleSubmit}
                    text="Guardar cambios"
                />
            </View>
        </>
    )
}

export default ExpenseDetail;