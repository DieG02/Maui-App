import { View, Text } from "react-native"
import customStyles from "../../styles/customStyles"

const { textBlue, white } = customStyles

interface Props {
  type: "income" | "expense"
  amount: number
  stakeholders: number
}

const SummaryDebt = ({
  type,
  amount,
  stakeholders
}: Props) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: textBlue,
        flexDirection: "column",
        display: "flex",
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", color: white }}>
        Total a {`${type === "income" ? "cobrar" : "pagar"}`}
      </Text>
      <Text style={{ color: white }}>
        {amount?.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })} de {stakeholders} {`${type === "income" ? "Clientes" : "Provedores"}`}
      </Text>
    </View>
  )
}

export default SummaryDebt;