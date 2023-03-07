import { View } from "react-native";
import InputForm from "../../../components/common/InputForm";
import Button from "../Button";
import customStyles from "../../../styles/customStyles";
import InputDate from "../../../components/common/InputDate";
import OptionModal from "../../../components/common/OptionModal";
import { useNavigation } from "@react-navigation/native";
import useForm from "../../../hooks/useForm";
import moment from "moment";
import usePayment from "../../../hooks/usePayment";
import useToggle from "../../../hooks/useToggle";

enum PaymentMethods {
  CASH = "Efectivo",
  CARD = "Tarjeta",
  BANK_TRANSFER = "Transferencia",
  OTHER = "Otro"
}
interface Props {
  amount: string
  id: string
}

const { mainColor, income, white } = customStyles
const today = moment.parseZone().format("DD-MM-YYYY")

const RepayModal = ({ amount, id }: Props) => {
  const navigation: any = useNavigation()
  const { value, toggle } = useToggle(false);
  const { values, setValues, validateValues } = useForm<Payments>({
    amount,
    paidAt: today,
    id,
    paymentMethod: PaymentMethods.CASH
  })
  const { handlePayment, paymentsOptions } = usePayment();

  const handleSubmit = () => {
    const toValidate = Object.keys(values)
    if (validateValues(toValidate)) {
      // mutateAsync()
    }
  }

  return (
    <View style={{
      backgroundColor: white,
      padding: 20,
      borderRadius: 15,
    }}>
      <InputForm
        keyboardType="numeric"
        placeholder="0,00"
        value={values.amount as string}
        name="Valor"
        setValue={val => {
          const newValue = !!val && val !== "NaN" ? val : "";
          setValues((prev) => ({ ...prev, amount: newValue }));
        }}
        marginBottom={20}
        marginTop={15}
        required />
      <OptionModal title="Método de Pago"
        options={paymentsOptions}
        isModalVisible={value}
        setIsModalVisible={toggle}
        selectedOption={values.paymentMethod}
        setSelectedOption={(text) =>
          setValues(prev => ({
            ...prev,
            //@ts-ignore
            paymentMethod: PaymentMethods[handlePayment(text)]
          }))
        } />
      <InputDate name="Fecha"
        date={values.paidAt as string}
        setDate={date => setValues(prev => ({ ...prev, paidAt: date }))}
        color={income} />
      <Button text="Crear Abono"
        onPress={handleSubmit}
        style={{
          backgroundColor: mainColor,
          marginTop: 25
        }} />
    </View>
  )
};

export default RepayModal;