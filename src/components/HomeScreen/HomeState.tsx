import React from "react";
import { View, Dimensions, ScrollView } from "react-native";
import BalanceStateCard from "./BalanceStateCard";
import { useQuery } from "react-query";
import { getMonthlyMainStats } from "../../services/balance";

const { width } = Dimensions.get("window");

const HomeState = () => {
  const { data } = useQuery("getMonthlyStats", getMonthlyMainStats);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 60}
      decelerationRate={0.5}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <BalanceStateCard
              state="Ingresos"
              value={"$" + data?.incomes}
              left={30}
              type="ingreso"
            />
            <BalanceStateCard
              state="Egresos"
              value={"$" + data?.expenses}
              left={20}
              type="egreso"
            />
            <BalanceStateCard
              state="Deudas por Cobrar"
              value={"$" + data?.toCollect}
              left={20}
              type="cobrar"
            />
            <BalanceStateCard
              state="Deudas por pagar"
              value={"$" + data?.debt}
              left={20}
              right={30}
              type="pagar"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeState;
