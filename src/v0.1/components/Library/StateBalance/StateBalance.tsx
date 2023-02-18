import React from "react";
import { View, ScrollView } from "react-native";
import customStyles from "../../../styles/customStyles";
import styles from "./style";
import { getMonthlyMainStatsResponseDto } from "../../../../../../Maui-Backend/src/controllers/types";
import StateBalanceCard from "../StateBalanceCard";

const { width, marginHorizontal } = customStyles;

interface Props {
  data: getMonthlyMainStatsResponseDto | undefined;
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
              value={"$" + data?.incomes}
              left={marginHorizontal}
              type="ingreso"
            />
            <StateBalanceCard
              state="Egresos"
              value={"$" + data?.expenses}
              left={20}
              type="egreso"
            />
            <StateBalanceCard
              state="Deudas por Cobrar"
              value={"$" + data?.toCollect}
              left={20}
              type="cobrar"
            />
            <StateBalanceCard
              state="Deudas por pagar"
              value={"$" + data?.debt}
              left={20}
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
