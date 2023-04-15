import React from "react";
import { View, ScrollView } from "react-native";
import customStyles from "../../../styles/customStyles";
import styles from "./style";
import { getMonthlyMainStatsResponseDto } from "../../../../../../Maui-Backend/src/controllers/types";
import StateBalanceCard from "../StateBalanceCard";

const { width, marginHorizontal } = customStyles;

interface Props {
  data: getMonthlyMainStatsResponseDto;
}

const StateBalance = ({ data }: Props) => {
  return (
    <ScrollView
      horizontal
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 60}
      decelerationRate={0.5}
    >
      <View style={styles.wrapper}>
        <View>
          <View style={styles.wrapper}>
            <StateBalanceCard
              state="Ingresos"
              value={data?.incomes.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
              left={marginHorizontal}
              type="ingreso"
            />
            <StateBalanceCard
              state="Egresos"
              value={data?.expenses.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
              left={15}
              type="egreso"
            />
            <StateBalanceCard
              state="Deudas por Cobrar"
              value={data?.toCollect.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
              left={15}
              type="cobrar"
            />
            <StateBalanceCard
              state="Deudas por pagar"
              value={data?.debt.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
              left={15}
              right={marginHorizontal}
              type="pagar"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StateBalance;
